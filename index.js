const LogFileReader = require('./controllers/logFileReader');
const LogFileAnalyser = require('./controllers/logFileAnalyser');
const XMLReportFileBuilder = require('./controllers/XMLReportFileBuilder');

const main = async (xmlFilePath) => {  
  let fileReader = new LogFileReader(xmlFilePath);
  const rl = fileReader.getFileContent();
  const fileAnalyser = new LogFileAnalyser(rl);
  const reportObject = await fileAnalyser.getAnalisysReport();

  XMLReportFileBuilder.saveReportToXml(reportObject);
};

main('./input/server.log');