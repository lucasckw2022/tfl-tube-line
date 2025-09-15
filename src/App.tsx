import React from "react";
import styled from "styled-components";
import TubeStatusContainer from "./components/TubeStatusContainer";

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`;

function App(): JSX.Element {
  return (
    <AppContainer>
      <TubeStatusContainer />
    </AppContainer>
  );
}

export default App;
