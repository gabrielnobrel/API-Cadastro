const sqliteConnection = require("../../sqlite");

const createUsers = require("./createUsers");

async function migrationsRun() {
  const schemas = [
    //referente as tabelas que o banco irá possuir
    createUsers,
  ].join(""); //remover os espaços do createUsers

  //CHAMAR O SQLCONNECTION
  sqliteConnection()
    //Promisse para executar os schemas
    .then((db) => db.exec(schemas))
    //Tratamento de erro
    .catch((error) => console.error(error));
}

module.exports = migrationsRun;
