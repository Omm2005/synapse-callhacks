import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { canvases } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET all canvases for the current user
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userCanvases = await db
      .select()
      .from(canvases)
      .where(eq(canvases.userId, session.user.id))
      .orderBy(desc(canvases.updatedAt));

    return NextResponse.json({ canvases: userCanvases });
  } catch (error) {
    console.error("Error fetching canvases:", error);
    return NextResponse.json(
      { error: "Failed to fetch canvases" },
      { status: 500 }
    );
  }
}

// POST create a new canvas
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, roomId } = body;

    if (!roomId) {
      return NextResponse.json(
        { error: "roomId is required" },
        { status: 400 }
      );
    }

    const newCanvas = await db
      .insert(canvases)
      .values({
        id: crypto.randomUUID(),
        title: title || "Untitled Canvas",
        userId: session.user.id,
        roomId,
      })
      .returning();

    return NextResponse.json({ canvas: newCanvas[0] }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating canvas:", error);
    
    // Check if it's a database table error
    if (error?.message?.includes('relation') || error?.message?.includes('does not exist')) {
      return NextResponse.json(
        { error: "Database not initialized. Please run: bun run db:push" },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create canvas", details: error.message },
      { status: 500 }
    );
  }
}
