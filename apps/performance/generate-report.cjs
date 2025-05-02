const reporter = require('k6-html-reporter');
const path = require('path');

const options = {
  jsonFile: path.resolve(__dirname, './reports/performance-result.json'),
  output: path.resolve(__dirname, './reports'),
};

reporter.generateSummaryReport(options);

console.log('✅ Relatório gerado com sucesso');
