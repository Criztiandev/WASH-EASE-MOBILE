import { useAtomValue } from "jotai";
import { Redirect } from "expo-router";
import { AuthRole } from "../../service/states/auth.atoms";
import { useEffect } from "react";

const determineRoute = (status) => {
  const routes = {
    user: "/customer/home",
    rider: "/rider/home",
  };

  if (status && routes[status]) {
    return routes[status];
  } else {
    return "/auth/sign-in";
  }
};

const RootScreen = () => {
  const roleStatus = useAtomValue(AuthRole);
  const currentRoute = determineRoute(roleStatus);

  useEffect(() => {
    console.log("The role status is updated");
  }, [roleStatus]);

  return <Redirect href={currentRoute} />;
};

export default RootScreen;
