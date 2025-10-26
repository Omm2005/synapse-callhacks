# Database Migration Guide

## Current Situation
The sidebar is showing empty because the `canvas` table doesn't exist in your database yet.

## Option 1: Safe Migration (Recommended)
If you want to keep existing `room` and `room_member` tables:

```bash
# Manually add just the canvas table
psql $DATABASE_URL -c "
CREATE TABLE IF NOT EXISTS canvas (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Untitled Canvas',
  user_id TEXT NOT NULL REFERENCES \"user\"(id) ON DELETE CASCADE,
  room_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
"
```

## Option 2: Full Migration (If you don't need room tables)
If the `room` and `room_member` tables are not important:

```bash
bun run db:push
# Then type 'yes' when prompted
```

## After Migration
1. Restart your dev server
2. Click "New Canvas" button
3. Your current canvas will be saved with a title based on your nodes
4. The sidebar will show your saved canvases

## Testing
- Create a new canvas → should auto-generate title from nodes
- Hover over canvas → click pencil to rename
- Click trash to delete (with confirmation)
