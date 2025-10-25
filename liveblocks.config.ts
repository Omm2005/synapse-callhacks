import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string,
  throttle: 16,
});

type Presence = {
  cursor: { x: number; y: number } | null;
  user: {
    name: string;
    avatar?: string;
  } | null;
};

type Storage = {
  // Define your storage structure if needed
};

type UserMeta = {
  id: string;
  info: {
    name: string;
    avatar?: string;
  };
};

type RoomEvent = {
  // Define custom events if needed
};

export const {
  RoomProvider,
  useMyPresence,
  useOthers,
  useUpdateMyPresence,
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);
