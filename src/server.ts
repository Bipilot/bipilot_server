import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import automationRoutes from './routes/automationRoutes';
import webhooks from './routes/automationRoutes';
import instaApis from './routes/instaRoutes';

const app:Express = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/automation', automationRoutes);
app.use('/webhooks', webhooks);
app.use('/insta', instaApis);
app.get('/', (req, res)=>{
  res.send("Nothing is here!")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
