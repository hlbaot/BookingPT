 interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    email: string;
}

interface SignUpRequest {
  email: string;
  password: string;
  confirmPassword: string;
}
