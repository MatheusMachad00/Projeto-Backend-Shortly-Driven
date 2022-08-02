import connection from "../dbStrategy/postgres.js";
import {loginSchema} from "../schemas/loginSchema.js";

export async function validateLogin(req, res, next){
  const loginData = req.body;
  const validation = loginSchema.validate(loginData);

  if (validation.error) {
    return res.status(422).send(validation.error.details.map(detail => detail.message))
  };

  const user = await connection.query(`
  SELECT email FROM users WHERE email = ($1)`, [loginData.email]);

  const password = await connection.query(`
  SELECT password FROM users WHERE email = ($1)
  `, [loginData.email]);

  if(user && bcrypt.compareSync(loginData.password, password)){
    const token = uuid();
    await connection.query(`
    INSERT INTO tokens 
    `)
    return res.status(201).send(token);
  } else {
    return res.status(401).send('Senha ou email incorretos!');

  }

  res.locals.loginData = loginData;
  next();
};