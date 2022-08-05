import connection from "../dbStrategy/postgres.js";

export async function getRank(_, res) {
  try {
    const {rows: ranking} = await connection.query(`
    SELECT users.id, users.name, COUNT(urls."userId") AS "linksCount", 
    SUM(urls."visitCount") AS "visitCount"
    FROM urls
    JOIN users ON users.id=urls."userId"
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10
    `)
    res.send(ranking).status(200)
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}