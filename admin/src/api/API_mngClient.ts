import axios from "axios";

const API_BASE_URL = "http://192.168.192.189:8080";

// Lấy danh sách bookings
export async function API_GetBookings(token: string) {
  const res = await axios.get(`${API_BASE_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Lấy danh sách packages
export async function API_GetPackages(token: string) {
  const res = await axios.get(`${API_BASE_URL}/packages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Xóa booking theo email
export async function API_DeleteBooking(email: string, token: string) {
  const res = await axios.delete(`${API_BASE_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { email },
  });
  return res.data;
}

// Duyệt booking theo email
export async function API_ApproveBooking(email: string, token: string) {
  const res = await axios.patch(
    `${API_BASE_URL}/bookings`,
    { email, status: "Đã duyệt" },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}
