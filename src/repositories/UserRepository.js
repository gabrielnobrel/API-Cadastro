const sqliteConnection = require("../database/sqlite"); //se conectar ao banco de dados

class UserRepository {
  async findByEmail(email) {
    const database = await sqliteConnection(); //Se conectar com a base de dados

    const user = await database.get("SELECT * FROM users WHERE email = (?)", [
      email,
    ]);

    return user;
  }

  async create({ name, email, password }) {
    const database = await sqliteConnection(); //Se conectar com a base de dados

    const userId = await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    return { id: userId };
  }
}

module.exports = UserRepository;
