import axios from "axios";
//API list package
export const API_Service = async (): Promise<Package[]> => {
  try {
    const res = await axios.get<Package[]>("http://192.168.192.189:8080/packages");
    return res.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy dữ liệu:", error.message || error);
    throw error;
  }
};
