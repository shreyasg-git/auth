// const getAuthHeaders = async (): Promise<Record<string, string>> => {
//   const token = await AsyncUtil.getItem(KeyValues.TOKENS);

//   const authToken = token?.authToken;

//   let newHeaders = {};

//   if (authToken) {
//     newHeaders = {
//       Authorization: `Bearer ${authToken}`,
//     };
//   }

//   return newHeaders;
// };
import axios from "axios";
axios.defaults.withCredentials = true;

const config = { apiUrl: "http://localhost:4000" };
export const signUp = async (payload: any) => {
  try {
    // const headers = await getAuthHeaders();
    const res = await axios.post(`${config.apiUrl}/auth`, payload, {
      //   headers,
    });
    return res;
  } catch (err) {
    console.log("error in signUp", err);
    return err;
  }
};

export const getProtected = async () => {
  try {
    // const headers = await getAuthHeaders();
    const res = await axios.get(`${config.apiUrl}/auth/protected`);
    return res;
  } catch (err) {
    console.log("error in getProtected", err);
    return err;
  }
};

export const loginMutation = async (payload: any) => {
  try {
    const res = await axios.post(`${config.apiUrl}/auth/login`, payload);
    return res;
  } catch (err) {
    console.log("error in loginMutation", err);
    return err;
  }
};
