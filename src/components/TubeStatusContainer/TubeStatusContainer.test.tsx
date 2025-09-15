import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TubeStatusContainer from "./index";
import { mockTubeDataArray } from "../../utils/mockData";

global.fetch = jest.fn();

describe("TubeStatusContainer Component", () => {
  const originalEnv = process.env.REACT_APP_TFL_APP_KEY;

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    // Set a default app key for most tests
    process.env.REACT_APP_TFL_APP_KEY = "test-app-key";
  });

  afterEach(() => {
    // Restore original environment variable after each test
    process.env.REACT_APP_TFL_APP_KEY = originalEnv;
  });

  it("renders loading state initially", () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<TubeStatusContainer />);

    expect(screen.getByText("Loading tube status...")).toBeInTheDocument();
  });

  it("renders title and tube statuses when data is loaded", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTubeDataArray,
    });

    render(<TubeStatusContainer />);

    await waitFor(() => {
      expect(screen.getByText("London Tube Status")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Bakerloo - Minor Delays")).toBeInTheDocument();
      expect(screen.getByText("Central - Good Service")).toBeInTheDocument();
    });
  });

  it("renders error message when API call fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(<TubeStatusContainer />);

    await waitFor(() => {
      expect(screen.getByText("Error: Network error")).toBeInTheDocument();
    });
  });

  it("renders error message when API returns non-ok response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<TubeStatusContainer />);

    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch tube status")
      ).toBeInTheDocument();
    });
  });

  it("calls the correct API endpoint with app key", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTubeDataArray,
    });

    render(<TubeStatusContainer />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://api.tfl.gov.uk/Line/Mode/Tube/Status?app_key=test-app-key"
      );
    });
  });

  it("handles empty tube data array", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<TubeStatusContainer />);

    await waitFor(() => {
      expect(screen.getByText("London Tube Status")).toBeInTheDocument();
    });

    // Should not render any tube status components
    expect(screen.queryByText(/Bakerloo|Central/)).not.toBeInTheDocument();
  });

  it("renders error message when app key is missing", async () => {
    delete process.env.REACT_APP_TFL_APP_KEY;

    render(<TubeStatusContainer />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Error: REACT_APP_TFL_APP_ID and REACT_APP_TFL_APP_KEY are required"
        )
      ).toBeInTheDocument();
    });
  });

  it("renders error message when app key is empty string", async () => {
    process.env.REACT_APP_TFL_APP_KEY = "";

    render(<TubeStatusContainer />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Error: REACT_APP_TFL_APP_ID and REACT_APP_TFL_APP_KEY are required"
        )
      ).toBeInTheDocument();
    });
  });
});
