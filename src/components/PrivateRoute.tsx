import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { auth } from "../firebase-config";

interface PrivateRouteProps extends RouteProps {
  component: React.FC<any>;
}

function PrivateRoute({ component: Component, ...theRest }: PrivateRouteProps) {
  const [user, setUser] = useState({}) as any;

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <Route
      {...theRest}
      render={(props) => {
        if (user) {
          return <Component {...props} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
}

export default PrivateRoute;
