const { Router } = require("express");
const NotesController = require("../controllers/NotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated); //colocar o middleware em todas as rotas

notesRoutes.post("/", notesController.create); //Criar nota
notesRoutes.get("/:id", notesController.show); //Exibindo nota individualmente
notesRoutes.delete("/:id", notesController.delete); //Deletar nota
notesRoutes.get("/", notesController.index); //Listar todas as notas

module.exports = notesRoutes;
