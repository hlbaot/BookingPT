import axios from "axios";

export const API_Service = async (): Promise<Package[]> => {
  const res = await axios.get<Package[]>(
    "http://192.168.192.189:8080/packages"
  );
  return res.data;
};
