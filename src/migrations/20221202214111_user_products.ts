import { Knex } from "knex";
import { v4 } from "uuid";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_products", (table) => {
    table
      .string("product_id")
      .references("id")
      .inTable("products")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .string("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.string("user_product_id").primary().defaultTo(v4());
    table.integer("quantity").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user_products");
}
