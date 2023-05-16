const { Router, request, response } = require("express");
const multer = require("multer");
//Aqui o arquivo setado
const uploadConfig = require("../configs/upload");

const UsersControllers = require("../controllers/UsersControllers");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER); //passando as configurações do multer

const usersController = new UsersControllers();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create); //Criar um usuário / Quem acessar o "/" vai ser chamado a "usersController.create"
usersRoutes.put("/", ensureAuthenticated, usersController.update); //Atualizar um usuário com autenticação
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
); //"single" carregando um arquivo só

module.exports = usersRoutes;
