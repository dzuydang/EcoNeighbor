import client from "./client";

export async function getComments(report_id) {
  const response = await client.get(`/comment/${report_id}`);
  return response.data;
}

export async function createComment(report_id, content) {
  const response = await client.post(`/comment/`, {
    report_id,
    content,
  });
  return response.data;
}

export async function editComment(comment_id, content) {
  const response = await client.put(`/comment/${comment_id}`, {
    content,
  });
  return response.data;
}

export async function deleteComment(comment_id) {
  const response = await client.delete(`/comment/${comment_id}`);
  return response.data;
}
