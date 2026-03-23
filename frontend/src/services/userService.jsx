import API from "../api";

export const getProfile = async () => {
  const res = await API.get("/users/me");
  return res.data;
};
