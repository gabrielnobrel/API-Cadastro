//GERADOR DE TOKEN
module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || "default", //Gerar o token
    expiresIn: "1d", //Tempo de expiração (um dia)
  },
};
