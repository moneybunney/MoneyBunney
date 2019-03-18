import Cookies from "universal-cookie";

const cookies = new Cookies();

export const isAuthenticated = () => !!cookies.get("Token");

export const signOut = () => {
  cookies.remove("Token");
};
