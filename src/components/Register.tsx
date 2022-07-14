import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Notification, TextInput } from "grommet";
import { useState } from "react";
import { auth } from "../firebase-config";

export default function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [visible, setVisible] = useState("");
  const [username, setUsername] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setUsername(user.user.email as any);
      setVisible("success");
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error) {
      setVisible("error");
    }
  };
  return (
    <div>
      <h3>Register User</h3>
      <TextInput
        type="email"
        defaultValue={registerEmail}
        value={registerEmail}
        onChange={(e) => {
          setRegisterEmail(e.target.value);
        }}
      />
      <TextInput
        type="password"
        defaultValue={registerPassword}
        value={registerPassword}
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
      {visible === "success" ? (
        <Notification
          toast
          status="normal"
          title="User Created"
          message={`${username} has been created`}
          onClose={() => {
            setVisible("");
          }}
        />
      ) : visible === "error" ? (
        <Notification
          status="critical"
          toast
          title="Error while creating the user"
          onClose={() => {
            setVisible("");
          }}
        />
      ) : null}
    </div>
  );
}
