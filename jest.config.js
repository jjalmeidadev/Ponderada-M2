module.exports = {
    // Define o ambiente de teste (node)
    testEnvironment: 'node',
    // Ativa a coleta de cobertura de testes
    collectCoverage: true,
    // Arquivos incluídos para a cobertura de testes
    collectCoverageFrom: [
      'controllers/**/*.js',
      'models/**/*.js',
      'routes/**/*.js',
      '!**/node_modules/**',
    ],
    // Diretório de saída dos relatórios de cobertura
    coverageDirectory: 'coverage',
  };
