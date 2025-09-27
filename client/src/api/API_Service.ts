import axios from "axios";
import { Package } from "../interfaces/package";

export const API_Service = async (): Promise<Package[]> => {
  const res = await axios.get<Package[]>(
    // "http://192.168.192.189:8080/packages"
    "https://68d20c23cc7017eec5425e30.mockapi.io/service"
  );
  return res.data;
};
