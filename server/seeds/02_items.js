// import { faker } from '@faker-js/faker';
import { faker } from '@faker-js/faker';

const maxQuantity = 100;
const numberOfItems = 20;
const numberOfUsers = 2;
const itemArray = [];

for (let i = 0; i < numberOfItems; i++) {
  let inputItem = {};
  inputItem.user_id = Math.floor(Math.random() * numberOfUsers) + 1;
  inputItem.item_name = faker.food.fruit();
  inputItem.description = faker.lorem.words({ min: 10, max: 25});
  inputItem.quantity = Math.floor(Math.random() * maxQuantity);
  itemArray.push(inputItem);
}

// console.log(itemArray);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert(itemArray);
}
