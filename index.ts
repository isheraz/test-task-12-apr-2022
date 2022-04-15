import express, { Express, Request, response, Response } from 'express';
import dotenv from 'dotenv';
const connectToMongo = require('./connect/mongoconnect');
const patientRoutes = require('./routes/patientRoute')
dotenv.config();

//Server Setup..
const app: Express = express();
const port: Number = 8000;
app.use(express.json());

// Configuring the database
connectToMongo();

//Base Point...
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Pet Hospital API');
});

//All routes..
app.use(patientRoutes);

// 12 & 13 Reamining....

export default app;