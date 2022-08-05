import connection from "../dbStrategy/postgres.js";


export async function getUserData (req, res){
  const { id } = res.locals.userId;
  
  try {
    const {rows: userData} = await connection.query(`
    SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount"
    FROM users
    JOIN urls
    ON urls."userId" = users.id
    WHERE users.id = $1
    GROUP BY users.id
    `, [id]);

    const {rows: urlData} = await connection.query(`
    SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount"
    FROM urls
    WHERE urls."userId" = $1
    `, [id]);


    res.send({
      id: userData[0].id, 
      name: userData[0].name, 
      visitCount: userData[0].visitCount,
      shortenedUrls: urlData}).status(200);

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}