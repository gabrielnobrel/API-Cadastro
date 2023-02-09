const fs = require("fs"); //biblioteca do node para manipulação de arquivos
const path = require("path"); //para manusear diretório
const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file) {
    //rename serve para mover ou renomear o arquivo, passando dois parâmetros
    await fs.promises.rename(
      //pegando o arquivo da pasta de tmp folder
      path.resolve(uploadConfig.TMP_FOLDER, file),
      //enviando o arquivo para a pasta upload
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  //DELETAR O ARQUIVO
  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      //verificar o status do aquivo, se ele está disponível, se está aberto...
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    //remover o arquivo
    await fs.promises.unlink(filePath); //deletar o arquivo filePath
  }
}

module.exports = DiskStorage;
