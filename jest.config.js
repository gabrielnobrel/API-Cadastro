module.exports = {
  // parar execução caso algum teste falhar
  bail: true,
  coverageProvider: "v8",

  testMatch: [
    // nome do arquivo de teste
    "<rootDir>/src/**/*.spec.js",
  ],
};
