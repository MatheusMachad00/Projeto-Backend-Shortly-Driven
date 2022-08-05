import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import authRoute from './routes/authRouter.js';
import urlRoute from './routes/urlRouter.js'
import userRoute from './routes/userRouter.js'
import rankRoute from './routes/rankRouter.js'

dotenv.config();
const app = express();
app.use(cors(), express.json());

app.use(authRoute);
app.use(urlRoute);
app.use(userRoute);
app.use(rankRoute);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    chalk.hex('#00ffff').bold(`Server is running on: http://localhost:${PORT}`)
  )
})