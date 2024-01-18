import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('consult_level', (table) => {
    table.increments('id');
    table.integer('career_level').notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
}



export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("consult_level");
}

