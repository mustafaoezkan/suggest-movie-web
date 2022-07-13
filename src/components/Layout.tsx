import { onAuthStateChanged, signOut } from "firebase/auth";
import { Button, Header } from "grommet";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

export default function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState({}) as any;
  const Logout = async () => {
    await signOut(auth);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, [user]);
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Suggest Movie
      </h1>
      <Header background="brand">
        {user ? (
          <>
            <Button
              onClick={() => {
                navigate("/main");
              }}
            >
              Main
            </Button>
            <Button
              onClick={() => {
                Logout();
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Button>
          </>
        )}
      </Header>
      <Outlet />
      <h4>User Logged In: </h4>
      {user ? user.email : "Not Logged In"}
    </div>
  );
}
