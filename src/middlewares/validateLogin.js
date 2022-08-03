import connection from "../dbStrategy/postgres.js";
import {loginSchema} from "../schemas/loginSchema.js";

export async function validateLogin(req, res, next){
  const loginData = req.body;
  const validation = loginSchema.validate(loginData);

  if (validation.error) {
    return res.status(422).send(validation.error.details.map(detail => detail.message))
  };
  
  res.locals.loginData = loginData;
  next();
};