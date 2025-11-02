import nodemailer from "nodemailer";
import { query } from "../config/db.js";

export async function sendAlertToUsers(report_id) {
  if (report_id === undefined) {
    throw new Error(`No report found with id ${report_id}`);
  }
  const report_query_result = await query(
    "SELECT * FROM reports WHERE report_id = $1",
    [report_id]
  );

  const user_query_email_result = await query("SELECT email FROM users;");

  const report = report_query_result.rows[0];
  const user_email_list = user_query_email_result.rows;

  const subject = `🚨 Verified EcoNeighbor Report Alert`;
  const text = `
  A reported issue has been verified and may require your attention.

  Report Details:
  • Title: ${report.title}
  • Description: ${report.description || "No description provided"}
  • Location: (${report.latitude}, ${report.longitude})
  • Report ID: ${report.report_id}
  • Submitted At: ${new Date(report.created_at).toLocaleString()}

  Photo: ${report.photo_url ? report.photo_url : "No photo attached"}
  `;

  // sends emails in parallel
  await Promise.all(
    user_email_list.map(({ email }) => sendEmail(email, subject, text))
  );
}

export async function sendAlertToGovernment(report_id) {
  if (report_id === undefined) {
    throw new Error(`No report found with id ${report_id}`);
  }
  const report_query_result = await query(
    "SELECT * FROM reports WHERE report_id = $1",
    [report_id]
  );

  const report = report_query_result.rows[0];

  const governmentEmail = process.env.GOVEMAIL;
  const subject = `🚨 Verified EcoNeighbor Report Alert`;
  const text = `
  A reported issue has been verified and may require your attention.

  Report Details:
  • Title: ${report.title}
  • Description: ${report.description || "No description provided"}
  • Location: (${report.latitude}, ${report.longitude})
  • Report ID: ${report.report_id}
  • Submitted At: ${new Date(report.created_at).toLocaleString()}

  Photo: ${report.photo_url ? report.photo_url : "No photo attached"}
  `;

  await sendEmail(governmentEmail, subject, text);
  await query(
    `UPDATE reports SET forwarded_to_authority = TRUE WHERE report_id = $1 RETURNING *;`,
    [report_id]
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASS,
  },
});

export async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: `"EcoNeighbor" <${process.env.EMAILUSER}>`,
      to,
      subject,
      text,
    });
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}
