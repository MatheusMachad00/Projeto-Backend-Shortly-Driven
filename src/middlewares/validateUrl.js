import { urlSchema } from "../schemas/urlSchema.js";

export async function validateUrl (req, res, next){
  const urlData = req.body;
  const validation = urlSchema.validate(urlData);
  
  if (validation.error) {
    return res.status(422).send(validation.error.details.map(detail => detail.message))
  };

  res.locals.urlData = urlData;
  next();
}