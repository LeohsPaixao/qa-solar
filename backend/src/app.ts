import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import router from './routes/routes.ts';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

export default app;
