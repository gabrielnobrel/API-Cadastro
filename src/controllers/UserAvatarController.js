const knex = require("../database/knex");
const AppError = require("../utills/AppError");
const DiskStorage = require("../Providers/DiskStorage");

class UserAvatarController {
  //ATUALIZAR O AVATAR
  async update(request, response) {
    //id do usuário
    const user_id = request.user.id;
    //nome do arquivo
    const avatarFilename = request.file.filename;

    //instanciando
    const diskStorage = new DiskStorage();

    //buscar o usuário
    const user = await knex("users").where({ id: user_id }).first();

    //verificar se o usuário existe
    if (!user) {
      throw new AppError(
        "Somente usuários autenticados podem mudar o avatar",
        401
      );
    }

    //verificar se há foto
    if (user.avatar) {
      //se houver foto, deleta a foto
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFilename);
    //colocar a imagem no avatar
    user.avatar = filename;

    //atualizando usuário
    await knex("users").update(user).where({ id: user_id });

    return response.json(user);
  }
}

module.exports = UserAvatarController;
