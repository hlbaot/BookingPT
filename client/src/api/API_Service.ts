import axios from "axios";
//API list package
export const API_Service = async (): Promise<Package[]> => {
  try {
    const res = await axios.get<Package[]>("https://67e671d16530dbd31110075c.mockapi.io/api/service");
    return res.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy dữ liệu:", error.message || error);
    throw error;
  }
};
