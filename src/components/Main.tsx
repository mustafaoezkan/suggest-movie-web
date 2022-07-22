import { onAuthStateChanged } from "firebase/auth";
import { Box, Tab, Tabs } from "grommet";
import { useState } from "react";
import { useEffect } from "react";
import { auth } from "../firebase-config";
import AddMovie from "./AddMovie";
import DeleteMovie from "./DeleteMovie";
import ShowMovie from "./ShowMovie";
import UpdateMovie from "./UpdateMovie";
import UserMain from "./UserMain";

export default function Main() {
  const [user, setUser] = useState({}) as any;

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <Box>
      <>
        {user.uid === "gcxv6eIO9ISOYPrVK7QWbm0hQgB3" ? (
          <Tabs>
            <Tab title="Show">
              <ShowMovie />
            </Tab>
            <Tab title="Add">
              <AddMovie />
            </Tab>
            <Tab title="Update">
              <UpdateMovie />
            </Tab>
            <Tab title="Delete">
              <DeleteMovie />
            </Tab>
          </Tabs>
        ) : (
          <UserMain />
        )}
      </>
    </Box>
  );
}
