import connection from "../dbStrategy/postgres.js";
import { nanoid } from 'nanoid';

export async function createShortUrl(req, res) {
  const { url } = req.body;
  const { id } = res.locals.userId
  const shortUrl = nanoid(8);

  console.log("eu sou o", id)
  try {
    await connection.query(`
    INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)
    `, [id, url, shortUrl]);

    res.send({shortUrl}).status(201);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }

}