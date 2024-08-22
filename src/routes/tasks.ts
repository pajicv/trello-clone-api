import { Request, Response, Router } from 'express';
import db from '../db';

const router = Router();

// Get all tasks
router.get('/', async (req: Request, res: Response) => {
    try {
        const tasks = await db('tasks')
            .join('statuses', 'tasks.status_id', 'statuses.id')
            .leftJoin('users', 'tasks.assigned_user_id', 'users.id')
            .select('tasks.*', 'statuses.name as status', 'users.username as assigned_user');
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single task
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const task = await db('tasks')
            .where('tasks.id', req.params.id)
            .join('statuses', 'tasks.status_id', 'statuses.id')
            .leftJoin('users', 'tasks.assigned_user_id', 'users.id')
            .select('tasks.*', 'statuses.name as status', 'users.username as assigned_user')
            .first();
        res.json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new task
router.post('/', async (req: Request, res: Response) => {
    const { title, description, status_id, assigned_user_id } = req.body;
    try {
        const [task] = await db('tasks')
            .insert({
                title,
                description,
                status_id,
                assigned_user_id,
            })
            .returning('*');
        res.status(201).json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Update a task
router.put('/:id', async (req: Request, res: Response) => {
    const { title, description, status_id, assigned_user_id } = req.body;
    try {
        const [task] = await db('tasks')
            .where('id', req.params.id)
            .update({
                title,
                description,
                status_id,
                assigned_user_id,
                updated_at: db.fn.now(),
            })
            .returning('*');
        res.json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a task
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await db('tasks').where('id', req.params.id).del();
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
