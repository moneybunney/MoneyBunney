import Cookies from "universal-cookie";

export const isAuthenticated = () => {
  const cookies = new Cookies();

  return !!(cookies.get("Token"));
};

export const signOut = () => {
  const cookies = new Cookies();

  cookies.remove("Token");
};
