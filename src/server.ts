import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import automationRoutes from './routes/automationRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/automation', automationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
