/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE users CASCADE');
  await knex('users').del()
  await knex('users').insert([
    {id: 1, first_name: 'Annie', last_name: 'Admin', username: 'AAdmin', password: 'password'},
    {id: 2, first_name: 'Andy', last_name: 'Admin', username: 'Andy', password: 'password2'}
  ]);
};
