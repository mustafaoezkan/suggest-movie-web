import { Button, TextInput } from "grommet";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({}) as any;
  const history = useHistory();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
    if (user) {
      history.push("/main");
    }
  }, [user]);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <>
      <div>
        <h3>Register User</h3>
        <TextInput
          type="email"
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
        />
        <TextInput
          type="password"
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        />
        <Button
          primary
          onClick={() => {
            register();
          }}
        >
          Create User
        </Button>
      </div>

      <div>
        <h3>Login</h3>
        <TextInput
          type="email"
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        />
        <TextInput
          type="password"
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <Button
          primary
          onClick={() => {
            login();
          }}
        >
          Login
        </Button>
      </div>

      <h4>User Logged In: </h4>
      {user ? user.email : "Not Logged In"}

      <Button
        primary
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </>
  );
}
