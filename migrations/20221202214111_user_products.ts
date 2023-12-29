import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_products", (table) => {
    table
      .integer("product_id")
      .references("id")
      .inTable("products")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("user_id", 300)
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.integer("user_product_id").primary();
    table.integer("quantity").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user_products");
}
