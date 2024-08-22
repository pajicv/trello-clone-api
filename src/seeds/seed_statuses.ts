import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('statuses').del();

    await knex('statuses').insert([
        { id: 1, name: 'Todo' },
        { id: 2, name: 'In Progress' },
        { id: 3, name: 'Done' },
    ]);
}
