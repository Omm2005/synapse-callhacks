import { Node } from "reactflow";

/**
 * Generate a smart title from canvas nodes
 */
export function generateCanvasTitle(nodes: Node[]): string {
  if (!nodes || nodes.length === 0) {
    return "Untitled Canvas";
  }

  // Extract text from node labels
  const labels = nodes
    .map((node) => {
      if (typeof node.data?.label === "string") {
        return node.data.label.trim();
      }
      return "";
    })
    .filter(Boolean)
    .slice(0, 3); // Take first 3 nodes

  if (labels.length === 0) {
    return `Canvas with ${nodes.length} nodes`;
  }

  // Create a title from the labels
  if (labels.length === 1) {
    return labels[0];
  } else if (labels.length === 2) {
    return `${labels[0]} & ${labels[1]}`;
  } else {
    return `${labels[0]}, ${labels[1]} & more`;
  }
}

/**
 * Get node count for a canvas
 */
export function getNodeCount(nodes: Node[]): number {
  return nodes?.length || 0;
}
