import axios from "axios";
import { LoginRequest, LoginResponse } from "@/interfaces/login";


// API request login
export const API_Signin = async (values: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(
    "http://192.168.192.189:8080/auth/login",
    values
  );
  return res.data;
};
