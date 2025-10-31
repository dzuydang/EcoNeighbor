import { sendEmail } from "../utils/mailer.js";

export async function reportIssue(req, res) {
  const { name, email, issue } = req.body;

  if (!name || !email || !issue) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required fields" });
  }

  try {
    const governmentEmail = process.env.GOVEMAIL;

    await sendEmail(
      governmentEmail,
      `Issue Report from ${name}`,
      `From: ${name} (${email})\n\nIssue:\n${issue}`
    );

    res.status(HTTP_STATUS.OK).json({ message: "Issue reported successfully" });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ message: "Error sending issue report", error });
  }
}
