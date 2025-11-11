// 🌿 constants.js

// Application-wide constants
export const PASSWORD_SALT_ROUNDS = 10;
export const ROLES = ["resident", "authority", "admin"];

// Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};
