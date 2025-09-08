import axios from "axios";

interface LoginResponse {
  token: string;
}

export async function API_Signin(username: string, password: string): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(
    "http://localhost:8080/auth/signin", 
    { username, password }
  );
  return response.data;
}
