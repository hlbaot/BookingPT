interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  email: string;
}

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpResponse {
  email: string;
  password: string;
  otp: string;
}
