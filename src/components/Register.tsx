import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextInput } from "grommet";
import { useState } from "react";
import { auth } from "../firebase-config";

export default function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

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
  return (
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
  );
}
