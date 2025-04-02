/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE users CASCADE');
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'Annie', last_name: 'Admin', username: 'Annie', password: 'password'},
    {first_name: 'Andy', last_name: 'Admin', username: 'Andy', password: 'password2'}
  ]);
};
