const { hash, compare } = require("bcryptjs"); //Pacote para criptografar a senha e de comparação
const AppError = require("../utills/AppError");

const UserRepository = require("../repositories/UserRepository");
const sqliteConnection = require("../database/sqlite"); //se conectar ao banco de dados
const UserCreateService = require("../services/UserCreateService");

class UsersControllers {
  //CRIAR UM USUÁRIO
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute({ name, email, password });

    return response.status(201).json(); //retorno para o cliente
  }

  //ATUALIZAR O USUÁRIO
  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection(); //conexaão com o BD

    //SELECIONAR O USUÁRIO PELO ID
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id,
    ]);

    if (!user) {
      //se  usuário não existir
      throw new AppError("Usuário não encontrado");
    }

    //VERIFICAR SE O EMAIL MODIFICADO EXISTE
    //filtrando pelo sql
    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso!");
    }

    //ATUALIZANDO O NAME E O EMAIL
    user.name = name ?? user.name; //O ? serve para caso não existir conteúdo dentro do name ele preencherá com user.name. Este cenário serve para quando o usuário não repassa o valor do campo em questão
    user.email = email ?? user.email;

    //ATUALIZAÇÃO DE SENHA
    //verificando se o usuário informou a senha antiga
    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha"
      );
    }

    //se ambos forem informados
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password); //verificar se a senha antiga é igual

      //se a senha antiga for falso
      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere!");
      }

      user.password = await hash(password, 8);
    }

    //ATUALIZAR NO BD
    await database.run(
      `UPDATE users SET 
      name = ?, 
      email = ?, 
      password = ?,
      updated_at = DATETIME('now') 
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return response.status(200).json();
  }
}

module.exports = UsersControllers;
