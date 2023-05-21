const { hash } = require("bcryptjs"); //Pacote para criptografar a senha e de comparação
const AppError = require("../utills/AppError");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    //VERIFICAR SE O EMAIL EXISTE
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Este email já está em uso.");
    }

    // CRIPTGRAFAR A SENHA DO USUÁRIO
    const hashedPassword = await hash(password, 8); //o "8" se refere ao fator de complexidade do hash

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }
}

module.exports = UserCreateService;
