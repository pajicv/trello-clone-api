import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('users').del();

    await knex('users').insert([
        { id: 1, username: 'pajicv', email: 'pajicv@example.com' },
        { id: 2, username: 'someone', email: 'someone@gmail.com' }
    ]);
}
