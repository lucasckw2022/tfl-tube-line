import React, { useMemo } from "react";
import styled from "styled-components";
import { TubeLine } from "../../types/tfl";
import { getTubeLineColor } from "../../utils/colorUtils";

const TubeStatusContainer = styled.div`
  border: 1px solid #ccc;
  display: flex;
  &:nth-child(n) {
    border-bottom: 0;
  }
  &:last-child {
    border-bottom: 1px solid #ccc;
  }
  @media (min-width: 768px) {
    &:nth-last-child(2) {
      border-bottom: 1px solid #ccc;
    }
  }
`;

const TubeInfo = styled.div`
  padding: 10px;
`;

const TubeTag = styled.span<{ $color: string }>`
  background-color: ${(props) => props.$color};
  width: 8px;
  height: 100%;
  display: inline-block;
`;

const TubeName = styled.div`
  margin: 0;
`;

interface TubeStatusProps {
  tube: TubeLine;
}

function TubeStatus({ tube }: TubeStatusProps): JSX.Element {
  const lineStatus = useMemo(() => tube.lineStatuses?.[0], [tube]);
  const tubeLineColor = useMemo(() => getTubeLineColor(tube.id), [tube.id]);

  return (
    <TubeStatusContainer>
      <TubeTag $color={tubeLineColor} aria-hidden="true" role="presentation" />
      <TubeInfo aria-hidden="true">
        <TubeName>{`${tube.name} ${
          lineStatus?.statusSeverityDescription
            ? `- ${lineStatus.statusSeverityDescription}`
            : ""
        }`}</TubeName>
      </TubeInfo>
    </TubeStatusContainer>
  );
}

export default TubeStatus;
