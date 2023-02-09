//O UP serve para criar tabela
exports.up = (knex) =>
  //criando uma tabela chamada "notes"
  knex.schema.createTable("notes", (table) => {
    //CRIANDO A TABELA
    table.increments("id");
    table.text("title");
    table.text("description");
    //Criar uma coluna "user_id" que faz referência ao id da tabela users
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

//Down serve para excluir a tabela
exports.down = (knex) => knex.schema.dropTable("notes");
