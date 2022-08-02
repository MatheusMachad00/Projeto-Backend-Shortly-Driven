import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from "../dbStrategy/postgres.js";

export async function userSignup(req, res){
  const signupData = {...res.locals.signupData};
  const encryptedPassword = bcrypt.hashSync(signupData.password, 10);
  console.log(signupData, encryptedPassword)
  try {
    await connection.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
    `, [signupData.name, signupData.email, encryptedPassword])

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}