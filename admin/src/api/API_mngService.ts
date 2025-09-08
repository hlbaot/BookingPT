import axios from "axios";

const API_BASE_URL = "http://192.168.192.189:8080";

// Lấy danh sách gói dịch vụ
export async function API_GetPackages(token: string) {
  const res = await axios.get(`${API_BASE_URL}/packages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Xóa gói dịch vụ
export async function API_DeleteService(id: number, token: string) {
  const res = await axios.delete(`${API_BASE_URL}/packages`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { package_id: id },
  });
  return res.data;
}

// Cập nhật gói dịch vụ
export async function API_UpdateService(payload: Partial<ServicePackage>, token: string) {
  const res = await axios.put(`${API_BASE_URL}/packages`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
