import { TUBE_LINE_COLORS, TubeLineId } from "../constants/tubeColors";

export const getTubeLineColor = (lineId: string): string => {
  const normalizedId = lineId.toLowerCase().replace(/\s+/g, "-") as TubeLineId;
  return TUBE_LINE_COLORS[normalizedId] || "#666666";
};
