import connection from "../dbStrategy/postgres.js";
import { signupSchema } from "../schemas/signupSchema.js";

export async function validadeSignup(req, res, next) {
  const signupData = req.body;
  const validation = signupSchema.validate(signupData);

  if (validation.error) {
    return res.status(422).send(validation.error.details.map(detail => detail.message))
  };

  const checkEmail = await connection.query(`
  SELECT email FROM users WHERE email =($1)`, [signupData.email]);

  if (checkEmail.rows.length != 0) {
    return res.status(409).send({ errorMessage: "E-mail já cadastrado." });
  };

  res.locals.signupData = signupData;
  next();
}