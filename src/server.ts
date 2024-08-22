import dotenv from "dotenv";
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/tasks';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
