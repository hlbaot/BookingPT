import axios from "axios";

// gửi OTP về email
export const API_SendOTP = async (email: string) => {
    const res = await axios.post(
        `http://192.168.192.189:8080/auth/send-otp?email=${email}`
    );
    return res.data;
};


// xác minh OTP
export const API_SignUp = async (email: string, password: string, otp: string)  => {
    const res = await axios.post(`http://192.168.192.189:8080/auth/register`, {
        email,
        otp,
        password,
    });
    return res.data;
};
