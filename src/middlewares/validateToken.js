import connection from "../dbStrategy/postgres.js";

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();

  if (!token) return res.sendStatus(401);

  const checkToken = await connection.query(`
  SELECT token FROM tokens where token = ($1)`, [token]);

  if (checkToken.rows.length === 0) return res.sendStatus(404);

  const userId = await connection.query(`
  SELECT users.id FROM users
  JOIN tokens 
  ON tokens."userId" = users.id
  WHERE token = $1`, [token]);

  /* console.log(userId[0].id) */

  res.locals.userId = userId.rows[0];
  next();
};