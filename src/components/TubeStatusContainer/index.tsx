import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TubeStatus from "../TubeStatus";
import { TubeLine } from "../../types/tfl";

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #dc143c;
  background-color: #ffe6e6;
  border: 1px solid #dc143c;
`;

const TubeList = styled.div`
  display: grid;
  gap: 0 10px;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

function TubeStatusContainer(): JSX.Element {
  const [tubeData, setTubeData] = useState<TubeLine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTubeStatus = async () => {
      try {
        const appKey = import.meta.env.VITE_TFL_APP_KEY;
        if (!appKey) {
          throw new Error("VITE_TFL_APP_KEY is required");
        }

        const response = await fetch(
          `https://api.tfl.gov.uk/Line/Mode/Tube/Status?app_key=${appKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tube status");
        }
        const data: TubeLine[] = await response.json();
        setTubeData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTubeStatus();
  }, []);

  if (loading) {
    return (
      <div id="main-content" role="main" aria-label="Tube status information">
        <LoadingMessage role="status" aria-live="polite">
          Loading tube status...
        </LoadingMessage>
      </div>
    );
  }

  if (error) {
    return (
      <div id="main-content" role="main" aria-label="Tube status information">
        <ErrorMessage role="alert" aria-live="assertive">
          Error: {error}
        </ErrorMessage>
      </div>
    );
  }

  return (
    <div id="main-content" role="main" aria-label="Tube status information">
      <Title>London Tube Status</Title>
      <div aria-labelledby="tube-status-heading">
        <TubeList
          role="list"
          aria-label="List of tube lines and their current status"
        >
          {tubeData.map((tube) => (
            <TubeStatus key={tube.id} tube={tube} />
          ))}
        </TubeList>
      </div>
    </div>
  );
}

export default TubeStatusContainer;
