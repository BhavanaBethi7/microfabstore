import API from "../api";

export const getMyOrders = async () => {
  const res = await API.get("/orders/myorders");
  return res.data;
};
