import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  Grommet,
  Header,
  Menu,
} from "grommet";
import Main from "./components/Main";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "16px",
      height: "20px",
    },
  },
};

function App() {
  return (
    <Grommet theme={theme}>
      <Main />
    </Grommet>
  );
}

export default App;
