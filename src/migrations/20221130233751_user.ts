import { Knex } from "knex";
import { v4 } from "uuid";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.string("id", 300).primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("user_session_token", 500);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
