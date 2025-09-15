import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TubeStatus from "./index";
import { TubeLine } from "../../types/tfl";
import { mockTubeData } from "../../utils/mockData";

describe("TubeStatus Component", () => {
  it("renders tube name and status correctly", () => {
    render(<TubeStatus tube={mockTubeData} />);

    expect(screen.getByText("Bakerloo - Minor Delays")).toBeInTheDocument();
  });

  it("renders with good service status", () => {
    const goodServiceTube: TubeLine = {
      ...mockTubeData,
      lineStatuses: [
        {
          ...mockTubeData.lineStatuses[0],
          statusSeverityDescription: "Good Service",
        },
      ],
    };

    render(<TubeStatus tube={goodServiceTube} />);

    expect(screen.getByText("Bakerloo - Good Service")).toBeInTheDocument();
  });

  it("renders with disrupted status", () => {
    const severeDelaysTube: TubeLine = {
      ...mockTubeData,
      lineStatuses: [
        {
          ...mockTubeData.lineStatuses[0],
          statusSeverityDescription: "Planned Closure",
        },
      ],
    };

    render(<TubeStatus tube={severeDelaysTube} />);

    expect(screen.getByText("Bakerloo - Planned Closure")).toBeInTheDocument();
  });

  it("handles undefined status description", () => {
    const undefinedStatusTube: TubeLine = {
      ...mockTubeData,
      lineStatuses: [
        {
          ...mockTubeData.lineStatuses[0],
          statusSeverityDescription: undefined as any,
        },
      ],
    };

    render(<TubeStatus tube={undefinedStatusTube} />);

    expect(screen.getByText("Bakerloo")).toBeInTheDocument();
  });
});
