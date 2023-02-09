exports.up = (knex) =>
  knex.schema.createTable("links", (table) => {
    table.increments("id");
    table.text("url").notNullable();

    //Criar uma coluna "note_id" que faz referência ao id da tabela notes e caso deletado a nota excluíra os links  vinculadas a ela
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");

    table.timestamp("created_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("links");
