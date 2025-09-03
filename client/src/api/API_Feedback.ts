import axios from "axios";
//  gửi feedback
export async function API_SubmitFeedBack(values: FormFeedback, token: string) {
  try {
    const response = await axios.post<FormBooking>(
      "http://192.168.192.189:8080/ratings",
      values,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error submitting booking:", error.message || error);
    throw error;
  }
}