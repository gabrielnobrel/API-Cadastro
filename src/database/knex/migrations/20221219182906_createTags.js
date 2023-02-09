exports.up = (knex) =>
  knex.schema.createTable("tags", (table) => {
    table.increments("id");
    //não aceita
    table.text("name").notNullable();

    //Criar uma coluna "note_id" que faz referência ao id da tabela notes e caso deletado a nota excluíra as tags vinculadas a ela
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    //Criar uma coluna "user_id" que faz referência ao id da tabela users
    table.integer("user_id").references("id").inTable("users");
  });

exports.down = (knex) => knex.schema.dropTable("tags");
