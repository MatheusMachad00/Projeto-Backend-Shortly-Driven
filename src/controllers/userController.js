import connection from "../dbStrategy/postgres.js";


export async function getUserData (req, res){
  const { id } = res.locals.userId
  
  try {
    
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}