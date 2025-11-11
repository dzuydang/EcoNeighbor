import client from "./client";

export async function getUserbyID() {
  const response = await client.get(`/user/get`);
  return response.data;
}
