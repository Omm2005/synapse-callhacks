"use client";

import React, { useCallback, useEffect, useRef } from "react";
import ReactFlow, { Controls, MiniMap } from "reactflow";
import { RoomProvider, useUpdateMyPresence } from "@/liveblocks.config";
import { CursorsOverlay } from "@/components/cursors/cursors-overlay";
import useStore from "@/lib/store";
import styles from "@/app/index.module.css";

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
  } = useStore();

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
        fitView
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
      <CursorsOverlay />
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
