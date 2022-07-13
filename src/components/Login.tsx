import { Button, TextInput } from "grommet";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/";

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      if (user) {
        navigate(from);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
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
    </>
  );
}
