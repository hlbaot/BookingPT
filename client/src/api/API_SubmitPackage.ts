import axios from "axios";
//  gửi lịch đặt
export async function API_SubmitBooking(values: FormBooking, token: string) {
  try {
    const response = await axios.post<FormBooking>(
      "https://your-api-endpoint.com/formBooking",
      values,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error submitting booking:", error.message || error);
    throw error;
  }
}