import { query } from "../config/db.js";
import { HTTP_STATUS } from "../constants.js";
import { sendAlertToUsers, sendAlertToGovernment } from "../utils/mailer.js";

export const verifyReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_verified } = req.body;

    if (id === undefined) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "report_id param cannot be empty",
      });
    }

    const result = await query(
      ` UPDATE reports
        SET is_verified = COALESCE($2, is_verified)
        WHERE report_id = $1
        RETURNING *;
        `,
      [id, is_verified]
    );

    if (result.rows.length === 0) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "No Report with that id" });
    }

    const updatedReport = result.rows[0];

    if (updatedReport.is_verified === true) {
      await sendAlertToUsers(id)
        .then(() => console.log("Alert email has been sent to All Users!"))
        .catch((err) => console.error("Error sending Alert email", err));
      await sendAlertToGovernment(id)
        .then(() => console.log("Alert email has been sent to Government!"))
        .catch((err) => console.error("Error sending Alert email", err));
    }

    res.status(HTTP_STATUS.OK).json(updatedReport);
  } catch (error) {
    const error_resp = `Error alertController updating report: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

// All verified reports become alerts
export const getAllAlertsDesc = async (req, res) => {
  try {
    const result = await query(
      "SELECT * FROM reports WHERE is_verified = TRUE ORDER BY created_at DESC;"
    );
    res.status(HTTP_STATUS.OK).json(result.rows);
  } catch (error) {
    const error_resp = `Error alertController getting all alerts: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};
