import { query } from "../config/db.js";
import { HTTP_STATUS } from "../constants.js";

export const getNumVerifiedReports = async (req, res) => {
  try {
    const result = await query(
      "SELECT COUNT(*) FROM reports WHERE is_verified = TRUE;",
    );
    res.status(HTTP_STATUS.OK).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error dataController getting number of verified reports: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const getNumUnverifiedReports = async (req, res) => {
  try {
    const result = await query(
      "SELECT COUNT(*) FROM reports WHERE is_verified = FALSE;",
    );
    res.status(HTTP_STATUS.OK).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error dataController getting number of unverified reports: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const getNumReports = async (req, res) => {
  try {
    const result = await query("SELECT COUNT(*) FROM reports");
    res.status(HTTP_STATUS.OK).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error dataController getting number of reports: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const getNumAdmin = async (req, res) => {
  try {
    const result = await query(
      "SELECT COUNT(*) FROM users WHERE role = 'admin';",
    );
    res.status(HTTP_STATUS.OK).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error dataController getting number of admin: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const getNumAuthority = async (req, res) => {
  try {
    const result = await query(
      "SELECT COUNT(*) FROM users WHERE role = 'authority';",
    );
    res.status(HTTP_STATUS.OK).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error dataController getting number of authority: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const getNumResident = async (req, res) => {
  try {
    const result = await query(
      "SELECT COUNT(*) FROM users WHERE role = 'resident';",
    );
    res.status(HTTP_STATUS.OK).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error dataController getting number of resident: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const getNumUsers = async (req, res) => {
  try {
    const result = await query("SELECT COUNT(*) FROM users");
    res.status(HTTP_STATUS.OK).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error dataController getting number of users: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};
