import request from 'supertest';
import app from '../src/server';
import db from '../src/db';

jest.mock('../src/app', () => {});

// Before running tests, ensure the database is in a known state
beforeAll(async () => {
    await db.migrate.latest({ directory: './src/migrations' }); // Run migrations
    await db.seed.run(); // Seed the database
});

// Close the database connection after all tests
afterAll(async () => {
    await db.destroy();
});

describe('GET /tasks', () => {
    it('should return all tasks', async () => {
        const response = await request(app).get('/api/tasks');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body.map((task: { id: number }) => task.id)).toStrictEqual([1, 2, 3]);
    });
});

describe('POST /tasks', () => {
    it('should create a new task', async () => {
        const newTask = {
            title: 'Test Task',
            description: 'This is a test task.',
            status_id: 1,
            assigned_user_id: 1,
        };
        const response = await request(app).post('/api/tasks').send(newTask);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Task');
    });

    it('should fail with wrong status id', async () => {
        const newTask = {
            title: 'Task with wrong status',
            description: 'some desc...',
            status_id: 4, // status_id 4 is not valid value
            assigned_user_id: 1
        };
        const response = await request(app).post('/api/tasks').send(newTask);
        expect(response.status).toBe(500);
    });
});

describe('PUT /tasks/:id', () => {
    it('should update an existing task', async () => {
        const updatedTask = {
            title: 'Updated Task Title',
            description: 'Updated description.',
            status_id: 2,
            assigned_user_id: 2,
        };
        const response = await request(app).put('/api/tasks/3').send(updatedTask); // Assuming task with ID 1 exists
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Task Title');
    });

});

describe('DELETE /tasks/:id', () => {
    it('should delete an existing task', async () => {
        const response = await request(app).delete('/api/tasks/1');
        expect(response.status).toBe(204);
    });
});
