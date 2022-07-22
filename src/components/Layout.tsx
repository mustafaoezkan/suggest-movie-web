import { onAuthStateChanged, signOut } from "firebase/auth";
import { Box, Button, CheckBox, Heading } from "grommet";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { Login, Logout } from "grommet-icons";

export default function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState({}) as any;
  const [darkMode, setDarkMode] = useState(false);
  const LogoutFunc = async () => {
    await signOut(auth);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, [user]);

  return (
    <Box>
      <Box
        background={darkMode ? "black" : "light-2"}
        fill="horizontal"
        overflow="auto"
        align="center"
        flex="grow"
        direction="column"
        justify="start"
        pad="small"
        margin={{ bottom: "small" }}
        border={{
          color: darkMode ? "accent-1" : "brand",
          size: "small",
          side: "all",
          style: "solid",
        }}
        elevation="small"
        gap="none"
      >
        <Box
          align="center"
          justify="center"
          gap="none"
          basis="xxsmall"
          fill="horizontal"
          border={{
            color: darkMode ? "accent-1" : "brand",
            size: "xsmall",
            side: "bottom",
            style: "ridge",
          }}
        >
          <Heading level="2" textAlign="end" margin={{ top: "medium" }}>
            Suggest Movie
          </Heading>
        </Box>
        <Box
          align="center"
          justify="between"
          direction="row"
          basis="xsmall"
          fill="horizontal"
        >
          <Button
            label={user ? "Logout" : "Login"}
            icon={user ? <Logout /> : <Login />}
            reverse
            onClick={user ? LogoutFunc : () => navigate("/login")}
          />
          <CheckBox
            label={darkMode ? "Dark Mode" : "Light Mode"}
            toggle
            reverse
            onChange={(e) => {
              e.target.checked ? setDarkMode(true) : setDarkMode(false);
            }}
          />
        </Box>
      </Box>
      <Outlet context={[darkMode, setDarkMode]} />
      <Box
        background={darkMode ? "black" : "light-2"}
        fill="horizontal"
        overflow="auto"
        align="center"
        flex="grow"
        direction="row"
        justify="center"
        pad="small"
        margin={{ bottom: "small", top: "small" }}
        border={{
          color: darkMode ? "accent-1" : "brand",
          size: "small",
          side: "all",
          style: "solid",
        }}
        elevation="small"
        gap="none"
      >
        <Heading level="4" textAlign="end" margin={{ right: "small" }}>
          User Logged In:{" "}
        </Heading>
        {user ? user.email : "Not Logged In"}
      </Box>
    </Box>
  );
}
