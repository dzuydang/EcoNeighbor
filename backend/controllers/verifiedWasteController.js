import { query } from "../config/db.js";
import { HTTP_STATUS } from "../constants.js";

export const getAllCenters = async (req, res) => {
  try {
    const result = await query("SELECT * FROM waste_centers ORDER BY name ASC");
    res.status(HTTP_STATUS.OK).json(result.rows);
  } catch (error) {
    const error_resp = `Error verifiedWasteController getting all centers: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const getCenter = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Invalid center_id",
      });
    }

    const result = await query(
      "SELECT * FROM waste_centers WHERE center_id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        error: "No waste center with that id",
      });
    }

    res.status(HTTP_STATUS.OK).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error verifiedWasteController getting center: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const createCenter = async (req, res) => {
  try {
    const {
      name,
      address,
      material_types,
      contact_info,
      latitude,
      longitude,
      about,
    } = req.body;

    if (!name) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "name cannot be empty",
      });
    }

    const result = await query(
      `INSERT INTO waste_centers 
        (name, address, material_types, contact_info, latitude, longitude, about) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, address, material_types, contact_info, latitude, longitude, about],
    );

    res.status(HTTP_STATUS.CREATED).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error verifiedWasteController creating a center: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const updateCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
      material_types,
      contact_info,
      latitude,
      longitude,
      about,
    } = req.body;

    if (!id || isNaN(parseInt(id))) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Invalid center_id",
      });
    }

    const result = await query(
      `UPDATE waste_centers
        SET name = COALESCE($1, name),
            address = COALESCE($2, address),
            material_types = COALESCE($3, material_types),
            contact_info = COALESCE($4, contact_info),
            latitude = COALESCE($5, latitude),
            longitude = COALESCE($6, longitude),
            about = COALESCE($7, about)
       WHERE center_id = $8
       RETURNING *`,
      [
        name,
        address,
        material_types,
        contact_info,
        latitude,
        longitude,
        about,
        id,
      ],
    );

    if (result.rows.length === 0) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "No waste center with that id" });
    }

    res.status(HTTP_STATUS.OK).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error verifiedWasteController updating center: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const deleteCenter = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Invalid center_id",
      });
    }

    const result = await query(
      "DELETE FROM waste_centers WHERE center_id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "No waste center with that id" });
    }

    res.status(HTTP_STATUS.OK).json("Waste center deleted successfully");
  } catch (error) {
    const error_resp = `Error verifiedWasteController deleting center: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};
