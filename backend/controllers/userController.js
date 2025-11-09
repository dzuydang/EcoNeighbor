import { query } from "../config/db.js";
import bcrypt from "bcrypt";
import { HTTP_STATUS, PASSWORD_SALT_ROUNDS, ROLES } from "../constants.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { full_name, email, password, role, location } = req.body;

    if (!full_name || !email || !password || !location) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "full_name, email, password, location cannot be empty",
      });
    }

    if (!ROLES.includes(role)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: `Invalid role: '${role}'. Allowed roles are ${ROLES.join(
          ", "
        )}.`,
      });
    }

    const password_hash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS); // 10 salt rounds

    const result = await query(
      `INSERT INTO users (full_name, email, password_hash, role, location)
        VALUES ($1, $2, $3, COALESCE($4, 'resident'), $5)
        RETURNING user_id, full_name, email, role, location, created_at;`,
      [full_name, email, password_hash, role, location]
    );

    res.status(HTTP_STATUS.CREATED).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error userController creating a user: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const getAllUsersDesc = async (req, res) => {
  try {
    const result = await query(
      "SELECT user_id, full_name, email, role, location FROM users ORDER BY created_at DESC;"
    );
    res.status(HTTP_STATUS.OK).json(result.rows);
  } catch (error) {
    const error_resp = `Error userController getting all users: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const getUserbyID = async (req, res) => {
  try {
    const { id } = req.user.id; // accessing user id based on decoded jwt token
    const result = await query(
      "SELECT user_id, full_name, email, role, location, created_at FROM users WHERE user_id = $1;",
      [id]
    );

    if (result.rows.length === 0) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "No User with that id" });
    }
    res.status(HTTP_STATUS.OK).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error userController getting user: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const getUserStatus = async (req, res) => {
  try {
    res.status(HTTP_STATUS.OK).end();
  } catch (error) {
    const error_resp = `Error userController getting login status: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};



export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email);
    const result = await query(
      "SELECT user_id, full_name, email, password_hash, role FROM users WHERE email = $1;",
      [email]
    );

    if (result.rows.length === 0) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "No User with that email" });
    }

    const user = result.rows[0];
    const isValidPass = await bcrypt.compare(password, user.password_hash);
    if (!isValidPass) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ error: "Invalid password" });
    }

    // deleting sensitive information before returning
    delete user.password_hash;

    const token = jwt.sign(
      { id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(HTTP_STATUS.OK).json({
      message: "Login Successful",
      user,
    });
  } catch (error) {
    const error_resp = `Error userController logging in: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const userLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, location, role } = req.body;

    if (!id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "user_id cannot be empty",
      });
    }

    if (role && !ROLES.includes(role)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: `Invalid role: '${role}'. Allowed roles are ${ROLES.join(
          ", "
        )}.`,
      });
    }

    const result = await query(
      `UPDATE users 
      SET full_name = COALESCE($2, full_name), 
      location = COALESCE($3, location), 
      role = COALESCE($4, role) 
      WHERE user_id = $1 
      RETURNING user_id, full_name, email, role, location, created_at;`,
      [id, full_name, location, role]
    );

    if (result.rows.length === 0) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "No User with that id" });
    }
    res.status(HTTP_STATUS.OK).json(result.rows[0]);
  } catch (error) {
    const error_resp = `Error userController updating user: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      "DELETE FROM users WHERE user_id = $1 RETURNING user_id, email;",
      [id]
    );

    if (result.rows.length === 0) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "No User with that id" });
    }

    const return_result = result.rows[0];

    res.status(HTTP_STATUS.OK).json({
      message: "User deleted successfully",
      return_result,
    });
  } catch (error) {
    const error_resp = `Error userController deleting user: ${error}`;
    console.error(error_resp, error);
    res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error_resp });
  }
};
