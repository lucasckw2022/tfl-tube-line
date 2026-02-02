import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import TubeStatusContainer from "./index";
import { mockTubeDataArray } from "../../utils/mockData";

global.fetch = vi.fn();

describe("TubeStatusContainer Component", () => {
  beforeEach(() => {
    vi.mocked(fetch).mockClear();
    vi.stubEnv("VITE_TFL_APP_KEY", "test-app-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("renders loading state initially", () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {}));

    render(<TubeStatusContainer />);

    expect(screen.getByText("Loading tube status...")).toBeInTheDocument();
  });

  it("renders title and tube statuses when data is loaded", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTubeDataArray,
    } as Response);

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
    vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));

    render(<TubeStatusContainer />);

    await waitFor(() => {
      expect(screen.getByText("Error: Network error")).toBeInTheDocument();
    });
  });

  it("renders error message when API returns non-ok response", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    render(<TubeStatusContainer />);

    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch tube status")
      ).toBeInTheDocument();
    });
  });

  it("calls the correct API endpoint with app key", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTubeDataArray,
    } as Response);

    render(<TubeStatusContainer />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://api.tfl.gov.uk/Line/Mode/Tube/Status?app_key=test-app-key"
      );
    });
  });

  it("handles empty tube data array", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    render(<TubeStatusContainer />);

    await waitFor(() => {
      expect(screen.getByText("London Tube Status")).toBeInTheDocument();
    });

    expect(screen.queryByText(/Bakerloo|Central/)).not.toBeInTheDocument();
  });

  it("renders error message when app key is missing", async () => {
    vi.stubEnv("VITE_TFL_APP_KEY", undefined);
    vi.resetModules();
    const { default: TubeStatusContainerNoKey } = await import("./index");
    render(<TubeStatusContainerNoKey />);

    await waitFor(() => {
      expect(
        screen.getByText("Error: VITE_TFL_APP_KEY is required")
      ).toBeInTheDocument();
    });
  });

  it("renders error message when app key is empty string", async () => {
    vi.stubEnv("VITE_TFL_APP_KEY", "");
    vi.resetModules();
    const { default: TubeStatusContainerEmptyKey } = await import("./index");
    render(<TubeStatusContainerEmptyKey />);

    await waitFor(() => {
      expect(
        screen.getByText("Error: VITE_TFL_APP_KEY is required")
      ).toBeInTheDocument();
    });
  });
});
