# Node Operations Guide

## ✅ Implemented Features

### 1. **Create Nodes**
- **Empty Canvas**: Shows "Create Your First Node" button
- **Add Node Button**: Floating `+` button in top-right corner (appears after first node)
- **Location**: Nodes are created at random positions
- **Type**: All nodes use custom node component with edit/delete

### 2. **Edit Nodes**
- **Click node** to select it
- **Edit icon** appears when selected
- **Click edit** → inline text input
- **Enter** to save, **Escape** to cancel
- Changes sync in real-time via Liveblocks

### 3. **Delete Nodes**
- **Method 1**: Click trash icon on selected node
- **Method 2**: Press `Delete` key when node is selected
- **Confirmation**: Shows confirm dialog
- **Auto-cleanup**: Connected edges are also deleted

### 4. **Connect Nodes**
- **Drag** from bottom handle of one node
- **Drop** on top handle of another node
- **Auto-sync**: Connections sync across all users

### 5. **New Canvas**
- Click **"New Canvas"** in sidebar
- Creates fresh empty canvas
- Shows "Create Your First Node" prompt
- Auto-saves to database

## Code Locations

### Store (`lib/store.ts`)
```typescript
addNode(node)      // Add new node
updateNode(id, data) // Edit node label
deleteNode(id)     // Remove node + edges
clearCanvas()      // Empty entire canvas
```

### Components
- `components/flow/custom-node.tsx` - Node with edit/delete UI
- `components/flow/empty-canvas.tsx` - "Create first node" screen
- `components/flow/add-node-button.tsx` - Floating + button
- `components/flow/collaborative-flow.tsx` - Main canvas

## User Flow

1. **New User**: Empty canvas → "Create Your First Node"
2. **First Node**: Click button → node appears → + button shows
3. **More Nodes**: Click + → new node appears
4. **Edit**: Select node → click pencil → type → Enter
5. **Delete**: Select node → click trash → confirm
6. **Connect**: Drag from bottom → drop on top
7. **New Canvas**: Sidebar → "New Canvas" → repeat
