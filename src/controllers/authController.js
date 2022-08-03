import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from "../dbStrategy/postgres.js";

export async function userSignup(_, res){
  const signupData = {...res.locals.signupData};
  const encryptedPassword = bcrypt.hashSync(signupData.password, 10);
  try {
    await connection.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
    `, [signupData.name, signupData.email, encryptedPassword]);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export async function userLogin (req, res){
  const loginData = {...res.locals.loginData};

try {
  const {rows: password} = await connection.query(`
  SELECT password FROM users WHERE email = ($1)`, [loginData.email]);

  const {rows: id} = await connection.query(`
  SELECT id FROM users WHERE email = ($1)`, [loginData.email])

  const userId = id[0].id;
  const userPassword = password[0].password

  if(userId && bcrypt.compareSync(loginData.password, userPassword)){
    const token = uuid();
    await connection.query(`
    DELETE FROM tokens WHERE "userId" = ($1)`, [userId])

    await connection.query(`
    INSERT INTO tokens ("userId", token) VALUES ($1, $2)`, [userId, token]);
    return res.status(200).send(token);
  } else {
    return res.status(401).send('Senha ou email incorretos!');
  };
} catch (error) {
  res.sendStatus(500);
    console.error(error);
}
}