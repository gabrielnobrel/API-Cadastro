const knex = require("../database/knex"); //conexão com o banco de dados
const AppError = require("../utills/AppError"); //mensagem de error
const { compare } = require("bcryptjs"); //comparador de senhas
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    //VALIDAÇÃO DE USUÁRIO
    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401); //excessão
    }

    //VALIDAÇÃO DE SENHA
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    //GERAR TOKEN
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id), //convertendo para texto, para inserir dentro do token
      expiresIn,
    });

    return response.json({ user, token });
  }
}

module.exports = SessionsController;
