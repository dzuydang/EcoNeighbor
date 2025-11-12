import client from "./client";

export async function getReports() {
  const response = await client.get(`/report/`);
  return response.data;
}

export async function createReport(
  title,
  description,
  photo_url,
  latitude,
  longitude,
) {
  const response = await client.post(`/report/`, {
    title,
    description,
    photo_url,
    latitude,
    longitude,
  });
  return response.data;
}

export async function verifyReport(report_id, is_verified) {
  const response = await client.put(`/alert/${report_id}`, {
    is_verified,
  });
  return response.data;
}

export async function editReport(
  report_id,
  title,
  description,
  photo_url,
  latitude,
  longitude,
) {
  const response = await client.put(`/report/${report_id}`, {
    title,
    description,
    photo_url,
    latitude,
    longitude,
  });
  return response.data;
}

export async function deleteReport(report_id) {
  console.log(report_id);
  const response = await client.delete(`/report/${report_id}`);
  return response.data;
}
