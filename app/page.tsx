'use client'

import React, { useEffect, useMemo, useState } from "react";
//@ts-ignore
import '@xyflow/react/dist/style.css';
import useStore from "../lib/store";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./index.module.css";
import { useSession } from "@/lib/auth-client";
import { SignIn } from "@/components/auth/sign-in";
import { CollaborativeFlow } from "@/components/flow/collaborative-flow";
import { DockNavbar } from "@/components/ui/dock-navbar";
import { Sidebar } from "@/components/ui/sidebar";
import { generateCanvasTitle, getNodeCount } from "@/lib/utils/canvas-title";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

/**
 * This example shows how to build a collaborative flowchart
 * using Liveblocks, Zustand and React Flow with realtime cursors
 */
export default function Index() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [currentRoomId, setCurrentRoomId] = useState<string>("zustand-flowchart");
  const [canvases, setCanvases] = useState<any[]>([]);

  const {
    liveblocks: { enterRoom, leaveRoom, isStorageLoading },
    nodes,
    clearCanvas,
  } = useStore();

  const roomId = useExampleRoomId(currentRoomId);

  // Fetch canvases from API
  useEffect(() => {
    if (session?.user) {
      fetchCanvases();
    }
  }, [session]);

  const fetchCanvases = async () => {
    try {
      const response = await fetch('/api/canvases');
      if (response.ok) {
        const data = await response.json();
        setCanvases(data.canvases || []);
      }
    } catch (error) {
      console.error('Failed to fetch canvases:', error);
    }
  };

  // Enter the Liveblocks room on load
  useEffect(() => {
    if (session?.user) {
      leaveRoom(); // Leave previous room first
      enterRoom(roomId);
      return () => leaveRoom();
    }
  }, [enterRoom, leaveRoom, roomId, session]);

  // Show loading while checking session
  if (isPending) {
    return (
      <>
        <DockNavbar />
        <div className={styles.loading}>
          <img src="https://liveblocks.io/loading.svg" alt="Loading" />
        </div>
      </>
    );
  }

  // Show sign in if not authenticated
  if (!session?.user) {
    return (
      <>
        <DockNavbar />
        <SignIn />
      </>
    );
  }

  // Show loading while storage is loading
  if (isStorageLoading) {
    return (
      <>
        <DockNavbar />
        <div className={styles.loading}>
          <img src="https://liveblocks.io/loading.svg" alt="Loading" />
        </div>
      </>
    );
  }

  const handleNewCanvas = async () => {
    const newRoomId = `zustand-flowchart-${Date.now()}`;
    
    console.log('Creating new canvas with room:', newRoomId);
    
    // Switch to new room (this will trigger the useEffect to enter the room)
    setCurrentRoomId(newRoomId);
    
    // Wait a bit for room to initialize, then clear
    setTimeout(() => {
      clearCanvas();
      console.log('Canvas cleared');
    }, 500);
    
    // Try to save to database
    try {
      const response = await fetch('/api/canvases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          roomId: newRoomId,
          title: "Untitled Canvas"
        }),
      });
      
      if (response.ok) {
        await fetchCanvases();
        console.log('Canvas saved to database');
      } else {
        console.warn('Canvas created locally but not saved to database. Run migration first.');
      }
    } catch (error) {
      console.warn('Canvas created locally but not saved to database:', error);
    }
  };

  const handleSelectCanvas = (selectedRoomId: string) => {
    setCurrentRoomId(selectedRoomId);
  };

  const handleRenameCanvas = async (canvasId: string, newTitle: string) => {
    try {
      const response = await fetch(`/api/canvases/${canvasId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });
      
      if (response.ok) {
        await fetchCanvases();
      }
    } catch (error) {
      console.error('Failed to rename canvas:', error);
    }
  };

  const handleDeleteCanvas = async (canvasId: string) => {
    try {
      const response = await fetch(`/api/canvases/${canvasId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchCanvases();
        // If deleted current canvas, switch to default
        const deletedCanvas = canvases.find(c => c.id === canvasId);
        if (deletedCanvas?.roomId === roomId) {
          setCurrentRoomId("zustand-flowchart");
        }
      }
    } catch (error) {
      console.error('Failed to delete canvas:', error);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar - Fixed z-index */}
      <div className="relative z-20">
        <Sidebar
          onNewCanvas={handleNewCanvas}
          onSelectCanvas={handleSelectCanvas}
          onRenameCanvas={handleRenameCanvas}
          onDeleteCanvas={handleDeleteCanvas}
          currentRoomId={roomId}
          canvases={canvases.map(c => ({
            ...c,
            createdAt: new Date(c.createdAt),
            updatedAt: new Date(c.updatedAt),
            nodeCount: getNodeCount(nodes)
          }))}
        />
      </div>
      
      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Canvas with background */}
        <div className="flex-1 relative overflow-hidden">
          {/* Background gradient - only for canvas area */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#b3dee2] via-[#eaf2d7] to-[#efcfe3] pointer-events-none" />
          
          {/* Grid pattern - only for canvas area */}
          <InteractiveGridPattern
            className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,white_20%,rgba(255,255,255,0.4)_70%,transparent)] pointer-events-none"
            width={40}
            height={40}
            hoverColor="#ea9ab2"
          />
          
          {/* Floating Navbar */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
            <DockNavbar />
          </div>
          
          {/* Logo in top right corner */}
          <div className="absolute top-6 right-6 z-50">
            <img 
              src="/synapse-logo.png" 
              alt="Synapse Logo" 
              className="h-12 w-auto drop-shadow-lg"
            />
          </div>
          
          {/* Flow canvas */}
          <div className="relative z-10 h-full">
            <CollaborativeFlow
              roomId={roomId}
              userName={session.user.name}
              userAvatar={session.user.image ?? undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function useExampleRoomId(roomId: string) {
  const searchParams = useSearchParams();
  const exampleId = searchParams?.get("exampleId");
  const exampleRoomId = useMemo(() => {
    return exampleId ? `${roomId}-${exampleId}` : roomId;
  }, [exampleId, roomId]);

  return exampleRoomId;
}
