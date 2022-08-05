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

  try {
    const urlData = await connection.query(`
    SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);

    const data = urlData.rows;

    if (urlData.rows.length === 0) {
      return res.sendStatus(404);
    };

    await connection.query(`
    UPDATE urls SET "visitCount"= "visitCount" + 1 WHERE id = $1
    `, [data[0].id]);

    res.redirect(data[0].url);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const userId = res.locals.userId

  try {
    const {rows: checkIfUrlExists} = await connection.query(`
    SELECT * FROM urls WHERE id = $1`, [id]);

    if (checkIfUrlExists.length === 0){
      return res.sendStatus(404)
    }

    const {rows: checkId} = await connection.query(`
    SELECT * FROM urls WHERE "userId" = $1 AND id = $2
    `, [userId.id, id]);

    if (checkId.length === 0){
      return res.sendStatus(401);
    }

    await connection.query(`
    DELETE FROM urls WHERE id = $1`, [id])

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}