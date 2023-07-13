import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("products", (table) => {
    table.string("id", 300).primary();
    table.string("name").notNullable().unique();
    table.double("price").notNullable();
    table.string("description").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("products");
}
