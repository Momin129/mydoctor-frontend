import axios from "axios";

export async function verifyToken(token) {
  const response = await axios.get("http://localhost:4000/api/verifyToken", {
    params: { token: token },
  });
  return response.data.success;
}
