import * as dotenv from 'dotenv';
dotenv.config(); // initialize .env
import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import automationRoutes from './routes/automationRoutes';
import instaApis from './routes/instaRoutes';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import { connect } from './db/mongo';


connect().catch(console.dir); // initialize database connection
const app: Express = express();
app.use(bodyParser.json());

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "REST API for Swagger Documentation",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    servers: [{ url: "http://localhost:3000/" }],
  },
  apis: [
    `${__dirname}/routes/authRoutes.js`
  ],
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', authRoutes);
app.use('/automation', automationRoutes);
app.use('/webhooks', automationRoutes);
app.use('/v1/instagram/', instaApis);
app.get('/', (req, res) => {
  res.send("Nothing is here!")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
