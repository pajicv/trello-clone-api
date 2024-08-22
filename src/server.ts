import express, { Application } from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/tasks';

const app: Application = express();

app.use(bodyParser.json());

app.use('/api/tasks', taskRoutes);

export default app;
