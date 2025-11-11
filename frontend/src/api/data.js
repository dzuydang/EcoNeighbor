import client from "./client";

export async function getNumVerifiedReports() {
  const response = await client.get("/data/getNumVerifiedReports");
  return response.data;
}

export async function getNumUnverifiedReports() {
  const response = await client.get("/data/getNumUnverifiedReports");
  return response.data;
}

export async function getNumReports() {
  const response = await client.get("/data/getNumReports");
  return response.data;
}

export async function getNumAdmin() {
  const response = await client.get("/data/getNumAdmin");
  return response.data;
}

export async function getNumAuthority() {
  const response = await client.get("/data/getNumAuthority");
  return response.data;
}

export async function getNumResident() {
  const response = await client.get("/data/getNumResident");
  return response.data;
}

export async function getNumUsers() {
  const response = await client.get("/data/getNumUsers");
  return response.data;
}
