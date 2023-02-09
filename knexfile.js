const path = require("path"); //Para informar o diretório

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db"),
    },

    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb), //Serve para habilitar a exclusão em cascata
    },

    //CRIAÇÃO DE MIGRATIONS
    migrations: {
      //Criação da pasta
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
    useNullAsDefault: true,
  },
};
