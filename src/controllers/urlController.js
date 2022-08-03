import connection from "../dbStrategy/postgres.js";
import { nanoid } from 'nanoid';

export async function createShortUrl(req, res) {
  const { url } = req.body;
  const { id } = res.locals.userId
  const shortUrl = nanoid(8);

  try {
    await connection.query(`
    INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)
    `, [id, url, shortUrl]);

    res.send({ shortUrl }).status(201);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export async function getUrlById(req, res) {
  const { id } = req.params;
  try {
    const urlData = await connection.query(`
    select id, "shortUrl", url from urls WHERE id = $1`, [id]);

    if (urlData.rows.length === 0) {
      return res.status(404).send("url não encontradas");
    }

    res.status(200).send(urlData.rows)

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export async function openShortUrl(req, res) {
  const { shortUrl } = req.params;


}