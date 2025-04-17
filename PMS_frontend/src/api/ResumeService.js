import axios from "axios";

export const baseURLL = "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: baseURLL,
});

export const generateResume = async (name,email,password) => {
  const response = await axiosInstance.post("/auth/register", {
    name: name,
    email:email,
    password:password
  });

  return response.data;
};
  