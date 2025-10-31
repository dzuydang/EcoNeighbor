import { query } from "../config/db.js";
import { HTTP_STATUS } from "../constants.js";
export const createReport = async (req, res) => {
  try {
    const {
      user_id,
      title,
      description,
      photo_url,
      latitude,
      longitude,
      is_verified,
      forwarded_to_authority,
    } = req.body;

    if (
      !user_id ||
      !title ||
      !description ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error:
          "user_id, title, description, latitude, longitude cannot be empty",
      });
    }

    const result = await query(
      `INSERT INTO reports (user_id, title, description, photo_url, latitude, longitude, is_verified, forwarded_to_authority)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
      [
        user_id,
        title,
        description,
        photo_url,
        latitude,
        longitude,
        is_verified,
        forwarded_to_authority,
      ]
    );

    res.status(HTTP_STATUS.CREATED).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error reportingController creating a report: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const getAllReportsDesc = async (req, res) => {
  try {
    const result = await query(
      "SELECT * FROM reports ORDER BY created_at DESC"
    );
    res.status(HTTP_STATUS.OK).json(result.rows);
  } catch (error) {
    const error_resp = `Error reportingController getting all reports: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query("SELECT * FROM reports WHERE report_id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "No Report with that id" });
    }
    res.status(HTTP_STATUS.OK).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error reportingController getting report: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      photo_url,
      latitude,
      longitude,
      is_verified,
      forwarded_to_authority,
    } = req.body;

    if (
      !title ||
      !description ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "title, description, latitude, longitude cannot be empty",
      });
    }

    const result = await query(
      `
            UPDATE reports
            SET title = $1,
            description = $2,
            photo_url = $3,
            latitude = $4,
            longitude = $5,
            is_verified = $6,
            forwarded_to_authority = $7
            WHERE report_id = $8 
            RETURNING *;
            `,
      [
        title,
        description,
        photo_url,
        latitude,
        longitude,
        is_verified,
        forwarded_to_authority,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "No Report with that id" });
    }
    res.status(HTTP_STATUS.OK).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error reportingController updating report: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      "DELETE FROM reports WHERE report_id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "No Report with that id" });
    }

    res.status(HTTP_STATUS.OK).json("Report deleted successfully");
  } catch (error) {
    const error_resp = `Error reportingController deleting report: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};
