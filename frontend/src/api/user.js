import client from "./client";

export async function getUserbyID() {
  const response = await client.get(`/user/get`);
  return response.data;
}

export async function getUserbyIDargID(user_id) {
  const response = await client.get(`/user/get/${user_id}`);
  return response.data;
}
