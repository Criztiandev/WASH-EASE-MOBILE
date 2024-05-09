import { useAtom } from "jotai";
import { AuthAtom } from "../service/states/auth.atoms";

const useAuth = () => {
  const [authAtom, setAuthAtom] = useAtom(AuthAtom);

  const handleLogin = () => {};
  const handleLogout = () => {};

  return { authAtom, handleLogin, handleLogout };
};

export default useAuth;
