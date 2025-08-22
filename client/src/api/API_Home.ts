import axios from "axios";

export async function API_Home() {
  try {
    const response = await axios.get("https://67e671d16530dbd31110075c.mockapi.io/api/home");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error;
  }
}