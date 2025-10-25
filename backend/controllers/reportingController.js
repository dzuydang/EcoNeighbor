import {query} from "../config/db.js";

export const createReport = async (req, res) => {
    try {
        const {author, content} = req.body;

        if (!author || !content) {
            return res.status(400).json({ error: "author or content cannot be empty"});
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
        res.status(500).json({ error: error_resp});
    }
};

export const getAllReports = async (req, res) => {};
export const getReport = async (req, res) => {};
export const updateReport = async (req, res) => {};
export const deleteReport = async (req, res) => {};