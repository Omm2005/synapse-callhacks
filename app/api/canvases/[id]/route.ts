import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { canvases } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// PATCH update a canvas
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title } = body;

    const updatedCanvas = await db
      .update(canvases)
      .set({
        title,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(canvases.id, params.id),
          eq(canvases.userId, session.user.id)
        )
      )
      .returning();

    if (updatedCanvas.length === 0) {
      return NextResponse.json({ error: "Canvas not found" }, { status: 404 });
    }

    return NextResponse.json({ canvas: updatedCanvas[0] });
  } catch (error) {
    console.error("Error updating canvas:", error);
    return NextResponse.json(
      { error: "Failed to update canvas" },
      { status: 500 }
    );
  }
}

// DELETE a canvas
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deletedCanvas = await db
      .delete(canvases)
      .where(
        and(
          eq(canvases.id, params.id),
          eq(canvases.userId, session.user.id)
        )
      )
      .returning();

    if (deletedCanvas.length === 0) {
      return NextResponse.json({ error: "Canvas not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting canvas:", error);
    return NextResponse.json(
      { error: "Failed to delete canvas" },
      { status: 500 }
    );
  }
}
