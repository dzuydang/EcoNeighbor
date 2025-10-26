import { query } from "../config/db.js";

export const createReport = async (req, res) => {
  try {
    const { author, content } = req.body;

    if (!author || !content) {
      return res
        .status(400)
        .json({ error: "author or content cannot be empty" });
    }

    const result = await query(
      `INSERT INTO reports (author, content)
            VALUES ($1, $2)
            RETURNING *`,
      [author, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    const error_resp = "Error reportingController creating a report:";
    console.error(error_resp, error);
    res.status(500).json({ error: error_resp });
  }
};

export const getAllReportsDesc = async (req, res) => {
  try {
    const result = await query(
      "SELECT * FROM reports ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    const error_resp = "Error reportingController getting all reports:";
    console.error(error_resp, error);
    res.status(500).json({ error: error_resp });
  }
};

export const getReport = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await query("SELECT * FROM reports WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No Report with that id" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    const error_resp = "Error reportingController getting report:";
    console.error(error_resp, error);
    res.status(500).json({ error: error_resp });
  }
};

export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, content } = req.body;

    if (!author || !content) {
      return res
        .status(400)
        .json({ error: "author or content cannot be empty" });
    }

    const result = await query(
      `
            UPDATE reports
            SET author = $1,
                content = $2
            WHERE id = $3
            RETURNING *`,
      [author, content, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No Report with that id" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    const error_resp = "Error reportingController updating report:";
    console.error(error_resp, error);
    res.status(500).json({ error: error_resp });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      "DELETE FROM reports WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No Report with that id" });
    }

    res.status(200).json("Report deleted successfully");
  } catch (error) {
    const error_resp = "Error reportingController deleting report:";
    console.error(error_resp, error);
    res.status(500).json({ error: error_resp });
  }
};
