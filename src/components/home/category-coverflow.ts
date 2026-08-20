export type CategoryCoverflowState = {
  depth: "active" | "near" | "far" | "outer";
  opacity: number;
  rotation: number;
  scale: number;
  zIndex: number;
};

export function getCategoryCoverflowState(
  index: number,
  activeIndex: number,
  rtl = false,
): CategoryCoverflowState {
  const logicalDistance = index - activeIndex;
  const visualDistance = logicalDistance * (rtl ? -1 : 1);
  const absoluteDistance = Math.abs(logicalDistance);

  if (absoluteDistance === 0) {
    return { depth: "active", opacity: 1, rotation: 0, scale: 1, zIndex: 4 };
  }

  if (absoluteDistance === 1) {
    return {
      depth: "near",
      opacity: 0.9,
      rotation: visualDistance < 0 ? 10 : -10,
      scale: 0.92,
      zIndex: 3,
    };
  }

  if (absoluteDistance === 2) {
    return {
      depth: "far",
      opacity: 0.64,
      rotation: visualDistance < 0 ? 13 : -13,
      scale: 0.84,
      zIndex: 2,
    };
  }

  return {
    depth: "outer",
    opacity: 0.34,
    rotation: visualDistance < 0 ? 15 : -15,
    scale: 0.78,
    zIndex: 1,
  };
}
