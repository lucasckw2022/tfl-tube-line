export const TUBE_LINE_COLORS = {
  bakerloo: "#B26300",
  central: "#DC241F",
  circle: "#FFD329",
  district: "#007D32",
  "hammersmith-city": "#F4A9BE",
  jubilee: "#A1A5A7",
  metropolitan: "#9B0056",
  northern: "#000000",
  piccadilly: "#0019A8",
  victoria: "#00A0E2",
  "waterloo-city": "#76D0BD",
} as const;

export type TubeLineId = keyof typeof TUBE_LINE_COLORS;
