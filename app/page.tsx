'use client'

import React, { useEffect, useMemo } from "react";
//@ts-ignore
import '@xyflow/react/dist/style.css';
import useStore from "../lib/store";
import { useSearchParams } from "next/navigation";
import styles from "./index.module.css";
import { useSession } from "@/lib/auth-client";
import { SignIn } from "@/components/auth/sign-in";
import { CollaborativeFlow } from "@/components/flow/collaborative-flow";

/**
 * This example shows how to build a collaborative flowchart
 * using Liveblocks, Zustand and React Flow with realtime cursors
 */
export default function Index() {
  const { data: session, isPending } = useSession();

  const {
    liveblocks: { enterRoom, leaveRoom, isStorageLoading },
  } = useStore();

  const roomId = useExampleRoomId("zustand-flowchart");

  // Enter the Liveblocks room on load
  useEffect(() => {
    if (session?.user) {
      enterRoom(roomId);
      return () => leaveRoom();
    }
  }, [enterRoom, leaveRoom, roomId, session]);

  // Show loading while checking session
  if (isPending) {
    return (
      <div className={styles.loading}>
        <img src="https://liveblocks.io/loading.svg" alt="Loading" />
      </div>
    );
  }

  // Show sign in if not authenticated
  if (!session?.user) {
    return <SignIn />;
  }

  // Show loading while storage is loading
  if (isStorageLoading) {
    return (
      <div className={styles.loading}>
        <img src="https://liveblocks.io/loading.svg" alt="Loading" />
      </div>
    );
  }

  return (
    <CollaborativeFlow
      roomId={roomId}
      userName={session.user.name}
      userAvatar={session.user.image ?? undefined}
    />
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
