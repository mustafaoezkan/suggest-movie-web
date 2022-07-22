import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Notification,
  Paragraph,
  Text,
  TextInput,
} from "grommet";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { Login, UserAdd } from "grommet-icons";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/";

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [username, setUsername] = useState("");
  const [visible, setVisible] = useState("");
  const [darkMode, setDarkMode] = useOutletContext() as any;

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setUsername(user.user.email as any);
      setVisible("successRegister");
      setRegisterEmail("");
      setRegisterPassword("");
      setTimeout(() => {
        navigate(from);
      }, 2000);
    } catch {
      setVisible("errorRegister");
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setVisible("successLogin");
      setTimeout(() => {
        if (user) {
          navigate(from);
        }
      }, 2000);
    } catch {
      setVisible("errorLogin");
    }
  };

  return (
    <>
      <Box
        background={darkMode ? "black" : "light-2"}
        fill="vertical"
        overflow="auto"
        align="center"
        flex="grow"
        elevation="small"
        pad="xlarge"
        direction="column"
        border={{
          color: darkMode ? "accent-1" : "brand",
          size: "small",
          side: "all",
          style: "solid",
        }}
      >
        <Card
          direction="column"
          border={{ color: darkMode ? "accent-1" : "brand", style: "inset" }}
          pad="medium"
          gap="none"
          width="large"
          height="medium"
          background={darkMode ? "#333333" : "white"}
        >
          <CardHeader
            align="center"
            direction="column"
            flex={false}
            justify="center"
          >
            <Paragraph size="large" textAlign="center">
              LOGIN / REGISTER
            </Paragraph>
          </CardHeader>
          <CardBody pad="small">
            <Box
              align="center"
              justify="end"
              direction="row-responsive"
              pad="medium"
              gap="medium"
              elevation="none"
              animation={{ type: "slideLeft", size: "xlarge" }}
            >
              <Text>Email</Text>
              <TextInput
                size="medium"
                type="email"
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                  setRegisterEmail(e.target.value);
                }}
              />
            </Box>
            <Box
              align="center"
              justify="center"
              pad="medium"
              elevation="none"
              direction="row-responsive"
              gap="medium"
              margin={{ top: "small", bottom: "small" }}
              animation={{ size: "xlarge", type: "slideLeft" }}
            >
              <Text>Password</Text>
              <TextInput
                size="medium"
                type="password"
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                  setRegisterPassword(e.target.value);
                }}
              />
            </Box>
            <Box
              align="center"
              justify="between"
              elevation="none"
              animation={{ type: "slideRight", size: "xlarge" }}
              direction="row"
              pad="medium"
            >
              <Button
                label="Login"
                active={false}
                plain={false}
                primary
                icon={<Login />}
                reverse
                onClick={() => {
                  login();
                }}
              />
              <Button
                label="Register"
                icon={<UserAdd />}
                primary
                reverse
                secondary={false}
                onClick={() => {
                  register();
                }}
              />
            </Box>
          </CardBody>
        </Card>
        {visible === "successRegister" ? (
          <Notification
            toast
            status="normal"
            title={`${username} has been created`}
            message="You will be directed to the relevant page in a short time"
            onClose={() => {
              setVisible("");
            }}
          />
        ) : visible === "errorRegister" ? (
          <Notification
            status="critical"
            toast
            title="Error while creating the user"
            onClose={() => {
              setVisible("");
            }}
          />
        ) : visible === "errorLogin" ? (
          <Notification
            status="critical"
            toast
            title="Error while logging in"
            onClose={() => {
              setVisible("");
            }}
          />
        ) : visible === "successLogin" ? (
          <Notification
            toast
            status="normal"
            title={`You have been logged in`}
            message="You will be directed to the relevant page in a short time"
            onClose={() => {
              setVisible("");
            }}
          />
        ) : null}
      </Box>
    </>
  );
}
