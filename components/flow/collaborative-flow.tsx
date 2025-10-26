"use client";

import React, { useCallback, useEffect, useRef, useMemo } from "react";
import ReactFlow, { Controls, MiniMap, Background } from "reactflow";
import { RoomProvider, useUpdateMyPresence } from "@/liveblocks.config";
import { CursorsOverlay } from "@/components/cursors/cursors-overlay";
import useStore from "@/lib/store";
import styles from "@/app/index.module.css";
import { EmptyCanvas } from "./empty-canvas";
import { AddNodeButton } from "./add-node-button";
import CustomNode from "./custom-node";

type CollaborativeFlowProps = {
  roomId: string;
  userName: string;
  userAvatar?: string;
};

function FlowWithCursors({ userName, userAvatar }: { userName: string; userAvatar?: string }) {
  const updateMyPresence = useUpdateMyPresence();
  const rafRef = useRef<number>();

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
  } = useStore();

  const handleAddNode = useCallback(() => {
    // Calculate center position or random position
    const newNode = {
      type: "custom",
      position: { 
        x: Math.random() * 500 + 100, 
        y: Math.random() * 300 + 100 
      },
      data: { label: "New Node" },
    };
    addNode(newNode);
  }, [addNode]);

  // Define custom node types - use CustomNode for all types
  const nodeTypes = useMemo(() => ({ 
    custom: CustomNode,
    default: CustomNode,
    input: CustomNode,
    output: CustomNode,
  }), []);

  // Set user info on mount
  useEffect(() => {
    updateMyPresence({
      user: {
        name: userName,
        avatar: userAvatar,
      },
    });
  }, [userName, userAvatar, updateMyPresence]);

  // Track cursor position with optimized performance
  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      // Store values before they become null in the async callback
      const target = event.currentTarget;
      const clientX = event.clientX;
      const clientY = event.clientY;

      // Cancel previous frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(() => {
        if (!target) return;

        const rect = target.getBoundingClientRect();
        updateMyPresence({
          cursor: {
            x: clientX - rect.left,
            y: clientY - rect.top,
          },
        });
      });
    },
    [updateMyPresence]
  );

  // Clear cursor when leaving
  const handlePointerLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    updateMyPresence({ cursor: null });
  }, [updateMyPresence]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      className={styles.wrapper}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode="Delete"
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
      <CursorsOverlay />
      
      {/* Show empty state when no nodes */}
      {nodes.length === 0 && <EmptyCanvas onCreateNode={handleAddNode} />}
    </div>
  );
}

export function CollaborativeFlow({ roomId, userName, userAvatar }: CollaborativeFlowProps) {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        user: null,
      }}
    >
      <FlowWithCursors userName={userName} userAvatar={userAvatar} />
    </RoomProvider>
  );
}
