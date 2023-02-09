class AppError {
  message;
  statusCode;

  //quem instanciar a classe, terá que informar o message e o statusCode, senão informar esse último ele será 400
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
