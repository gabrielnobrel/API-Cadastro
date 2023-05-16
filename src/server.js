require("dotenv/config");
require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations"); //Importando SQlite
const AppError = require("./utills/AppError");
const express = require("express"); //Importando o express
const routes = require("./routes/index.js"); //Importando as rotas do index.js
const uploadConfig = require("./configs/upload");
const cors = require("cors"); //biblioteca para conectar o back com o front

migrationsRun(); //Executar o Banco de Dados, ou seja, criar a tabela do BD

const app = express(); //Chamando o Express
app.use(cors()); //habilitar a comunicação entre back e front
app.use(express.json()); //De que forma ele irá receber as requisições
app.use(routes);
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER)); //apresentar arquivo de foto

app.use((error, request, response, next) => {
  //ERROR DO LADO DO CLIENTE
  if (error instanceof AppError) {
    //se a instância do error for igual ao error do AppError, ou seja, error do lado do cliente
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  //ERROR DO SERVIDOR
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

//ACESSO DE PORTA
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); //Chamando a porta e enviando uma mensagem
