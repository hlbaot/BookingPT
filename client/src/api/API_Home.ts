import axios from "axios";
// API get img home
export async function API_Home() {
  try {
    const res = await axios.get("https://67e671d16530dbd31110075c.mockapi.io/api/home");
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error;
  }
}