import client from "./client";

export async function login({ email, password }) {
  const response = await client.post("/user/login", {
    email,
    password,
  });
  return response.data;
}

export async function signup({ fullName, email, password, role, location }) {
  const response = await client.post("/user/", {
    full_name: fullName,
    email,
    password,
    role,
    location,
  });
  return response.data;
}

export async function logout() {
  const response = await client.post("/user/logout");
  return response.data;
}

// code in the future for getting user information
// export async function getUserbyId(id) {
//   const response = await client.get(`/user/${id}`);
//   return response.data;
// }
