import client from "./client";

export async function getWasteCenters() {
  const response = await client.get(`/wastecenter/`);
  return response.data;
}

export async function createWasteCenter(
  name,
  address,
  material_types,
  contact_info,
  latitude,
  longitude,
  about,
) {
  const response = await client.post(`/wastecenter/`, {
    name,
    address,
    material_types,
    contact_info,
    latitude,
    longitude,
    about,
  });
  return response.data;
}

export async function editWasteCenter(
  center_id,
  name,
  address,
  material_types,
  contact_info,
  latitude,
  longitude,
  about,
) {
  const response = await client.put(`/wastecenter/${center_id}`, {
    name,
    address,
    material_types,
    contact_info,
    latitude,
    longitude,
    about,
  });
  return response.data;
}

export async function deleteWasteCenter(center_id) {
  const response = await client.delete(`/wastecenter/${center_id}`);
  return response.data;
}
