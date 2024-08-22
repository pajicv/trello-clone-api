import { Request, Response, Router } from 'express';
import db from '../db';

const router = Router();

// Get all tasks
router.get('/', async (req: Request, res: Response) => {
    const tasks = await db('tasks')
        .join('statuses', 'tasks.status_id', 'statuses.id')
        .join('users', 'tasks.assigned_user_id', 'users.id')
        .select('tasks.*', 'statuses.name as status', 'users.username as assigned_user');
    res.json(tasks);
});

// Get a single task
router.get('/:id', async (req: Request, res: Response) => {
    const task = await db('tasks')
        .where('tasks.id', req.params.id)
        .join('statuses', 'tasks.status_id', 'statuses.id')
        .join('users', 'tasks.assigned_user_id', 'users.id')
        .select('tasks.*', 'statuses.name as status', 'users.username as assigned_user')
        .first();
    res.json(task);
});

// Create a new task
router.post('/', async (req: Request, res: Response) => {
    const { title, description, status_id, assigned_user_id } = req.body;
    const [task] = await db('tasks')
        .insert({
            title,
            description,
            status_id,
            assigned_user_id,
        })
        .returning('*');
    res.status(201).json(task);
});

// Update a task
router.put('/:id', async (req: Request, res: Response) => {
    const { title, description, status_id, assigned_user_id } = req.body;
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
});

// Delete a task
router.delete('/:id', async (req: Request, res: Response) => {
    await db('tasks').where('id', req.params.id).del();
    res.status(204).send();
});

export default router;
