import axios from "axios";
import { Package } from "@/interfaces/package";

export const API_Service = async (): Promise<Package[]> => {
  try {
    const response = await axios.get<Package[]>("https://67e671d16530dbd31110075c.mockapi.io/api/service");
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy dữ liệu:", error.message || error);
    throw error;
  }
};
