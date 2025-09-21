import axios from "axios";

export async function API_SubmitFeedBack(values: FormFeedback, token: string) {
  try {
    const response = await axios.post(
      "http://192.168.192.189:8080/ratings/create",
      values,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error submitting feedback:", error.message || error);
    throw error;
  }
}
