import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('tasks').del();

    // Inserts seed entries
    await knex('tasks').insert([
        {
            id: 1,
            title: 'Task 1',
            description: 'Description for Task 1',
            status_id: 1, // Ensure this status_id exists in the statuses table
            assigned_user_id: 1, // Ensure this user_id exists in the users table
        },
        {
            id: 2,
            title: 'Task 2',
            description: 'Description for Task 2',
            status_id: 2, // Ensure this status_id exists in the statuses table
            assigned_user_id: 2, // Ensure this user_id exists in the users table
        },
        {
            id: 3,
            title: 'Task 3',
            description: 'Description for Task 3',
            status_id: 3, // Ensure this status_id exists in the statuses table
            assigned_user_id: null, // Nullable field
        },
    ]);
}
