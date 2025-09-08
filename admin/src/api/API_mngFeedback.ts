import axios from "axios";

const API_BASE_URL = "http://192.168.192.189:8080";

// Lấy danh sách feedback
export async function API_GetFeedbacks(token: string) {
  const res = await axios.get(`${API_BASE_URL}/feedback`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Xóa feedback theo email
export async function API_DeleteFeedback(email: string, token: string) {
  const res = await axios.delete(`${API_BASE_URL}/feedback`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { email },
  });
  return res.data;
}
