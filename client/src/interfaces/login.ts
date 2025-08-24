 interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    email: string;
}