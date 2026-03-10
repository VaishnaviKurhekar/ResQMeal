import API from "./api";

export const registerUser = (data) => {
  // console.log('in registerUser');
  return API.post("/auth/register", data);
};

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export const getMe = () => {
  return API.get("/auth/me");
};