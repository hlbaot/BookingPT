import axios from "axios";

export const API_SignIn = async (values: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(
    "http://192.168.192.189:8080/auth/login",
    values
  );
  return res.data;
};
