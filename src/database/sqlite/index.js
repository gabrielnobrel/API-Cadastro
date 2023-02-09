const sqlite3 = require("sqlite3"); //responsável por fornecer conexão com a BD
const sqlite = require("sqlite");
const path = require("path"); //Biblioteca para chamar arquivos

async function sqliteConnection() {
  const database = await sqlite.open({
    //abrir conexão
    //Onde serão salvos os arquivos
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database,
  });

  return database;
}

module.exports = sqliteConnection;
