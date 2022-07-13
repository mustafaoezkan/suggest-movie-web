import { onAuthStateChanged } from "firebase/auth";
import { Tab, Tabs } from "grommet";
import { useState } from "react";
import { useEffect } from "react";
import { auth } from "../firebase-config";
import AddMovie from "./AddMovie";
import DeleteMovie from "./DeleteMovie";
import ShowMovie from "./ShowMovie";
import UpdateMovie from "./UpdateMovie";

export default function Main() {
  const [user, setUser] = useState({}) as any;

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        width: "50%",
        padding: "5rem",
      }}
    >
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
          <Tabs>
            <Tab title="Show">
              <ShowMovie />
            </Tab>
            <Tab title="Add">
              <AddMovie />
            </Tab>
          </Tabs>
        )}
      </>
    </div>
  );
}
