import { Grommet } from "grommet";
import Main from "./components/Main";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import Register from "./components/Register";

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
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes*/}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* Private Routes*/}
          <Route element={<RequireAuth />}>
            <Route path="main" element={<Main />} />
          </Route>
          {/* Missing Routes*/}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </Grommet>
  );
}

export default App;
