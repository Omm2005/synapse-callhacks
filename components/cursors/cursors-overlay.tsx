"use client";

import { useOthers } from "@/liveblocks.config";
import { Cursor, getColorForUser } from "./cursor";

export function CursorsOverlay() {
  const others = useOthers();

  return (
    <>
      {others.map(({ connectionId, presence }) => {
        // Show cursor only if user has moved it (cursor is not null)
        if (!presence.cursor || !presence.user) {
          return null;
        }

        return (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
            name={presence.user.name}
            avatar={presence.user.avatar}
            color={getColorForUser(connectionId)}
          />
        );
      })}
    </>
  );
}
