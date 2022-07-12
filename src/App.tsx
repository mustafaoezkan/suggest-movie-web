import React from "react";
import { Grommet } from "grommet";
import Main from "./components/Main";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

const theme = {
  global: {
    font: {
      family: "Edu NSW ACT Foundation",
      size: "16px",
      height: "20px",
    },
  },
};

function App() {
  return (
    <Grommet theme={theme}>
      <Login />
      <PrivateRoute path="/main" component={Main} />
    </Grommet>
  );
}

export default App;
