import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import automationRoutes from './routes/automationRoutes';


const app:Express = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/automation', automationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
