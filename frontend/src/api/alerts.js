import client from "./client";

export async function getAllAlerts() {
    const response = await client.get("/alert");
    return response.data;
}
