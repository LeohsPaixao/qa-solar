import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import router from './routes/routes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

export default app;
