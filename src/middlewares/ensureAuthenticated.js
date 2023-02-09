const { verify } = require("jsonwebtoken");
const AppError = require("../utills/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  //o next chama a próxima função
  const authHeader = request.headers.authorization; //token do usuário

  //VERIFICAR SE O TOKEN NÃO EXISTE
  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" "); //quabrando o texto no primeiro espaço encontrado, ou seja, capturando o token

  //VERIFICAÇÃO DE TOKEN
  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret); //substituindo sub por "user_id"

    request.user = {
      id: Number(user_id), //Convertendo em número
    };

    return next(); //chamar a próxima função, onde o middleware for encaixado
  } catch {
    throw new AppError("JWT Token inválido", 401);
  }
}

module.exports = ensureAuthenticated;
