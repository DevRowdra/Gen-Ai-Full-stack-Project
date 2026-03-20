import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.cotext";
import { getMe, login, logout, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      // console.log(data, "form hook function");
      // console.log(data?.data?.user, "from use auth file");
      setUser(data?.data?.user);
      // console.log(user, "from useAuth file");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    // console.log(username, email, password, "form useAuth.js file");
    try {
      const data = await register({ username, email, password });

      console.log(data?.data?.user, "form register  hook function");
      setUser(data?.data?.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      setUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getAndSetUser = async () => {
      const data = await getMe();
      setUser(data?.data?.user);
      setLoading(false);
    };
    getAndSetUser();
  }, []);
  return { user, loading, handleRegister, handleLogin, handleLogout };
};
