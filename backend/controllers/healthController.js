import { HTTP_STATUS } from "../constants.js";

export const getHealth = async (req, res) => {
  try {
    res.status(HTTP_STATUS.OK).end();
  } catch (error) {
    const error_resp = `Error getting Health: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};
