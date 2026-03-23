import API from "../api";

export const getOwnerDetails = async () => {
  const res = await API.get("/owner");
  return res.data;
};
