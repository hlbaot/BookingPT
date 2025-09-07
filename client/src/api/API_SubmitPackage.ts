// api/API_SubmitPackage.ts
import axios from "axios";
export async function API_SubmitBooking(
  values: FormBooking,
  token: string,
  packageId: number
) {
  try {
    const response = await axios.post<FormBooking>(
      `http://192.168.192.189:8080/formBookings/create?packageId=${packageId}`,
      values,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error submitting booking:", error.message || error);
    throw error;
  }
}
