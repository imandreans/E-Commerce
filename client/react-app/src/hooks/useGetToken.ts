import { useCookies } from "react-cookie";

// get token
export const useGetToken = () => {
  //retrieve "access_token" cookies with useCookies
  const [cookies, _] = useCookies(["access_token"]);
  //return it as headers with authorization that contains cookies.access_token
  return { headers: { authorization: cookies.access_token } };
};
