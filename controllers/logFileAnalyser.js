const StartRenderingRegistry = require('../models/startRenderingRegistry');
const RegexFunctions = require('../functions/RegexFunctions');

module.exports = class LogFileReader {
  startRenderingHash = {};
  renderingRegistry = {};
  startRenderingArrays = [];
  numsOfDuplicatedUids = 0;
  unnecessary = 0;
  
  constructor(fileContent){
    this.fileContent = fileContent;
  }

  async getAnalisysReport(){
    for await (const line of this.fileContent) {
      if (RegexFunctions.isGetRenderingLine(line)) {
        let uid = RegexFunctions.getUid(line);
        
        if (this.startRenderingHash[uid]) {
          this.startRenderingHash[uid].get.push(RegexFunctions.getDateTimeExecution(line));
        }
      }
      else if (RegexFunctions.isStartRenderingReturnLine(line)) {
        let uid = RegexFunctions.getUid(line);
        let threadName = RegexFunctions.getThreadLine(line);
  
        if (this.startRenderingHash[uid]) {
          this.numsOfDuplicatedUids++;
          continue;
        }
  
        if (this.renderingRegistry[threadName]){
          this.renderingRegistry[threadName].uid = uid;
          this.startRenderingHash[uid] = Object.assign({}, this.renderingRegistry[threadName]);
  
          delete this.renderingRegistry[threadName];
        }
      }
      else if (RegexFunctions.isStartRenderingRequestLine(line)) {
        let docNumAndPage = RegexFunctions.getDocumentNum(line);
        let startRenderingTime = RegexFunctions.getDateTimeExecution(line);
        let threadName = RegexFunctions.getThreadLine(line);
  
        this.renderingRegistry[threadName] = new StartRenderingRegistry(
          docNumAndPage.documentNum,
          docNumAndPage.page,
          startRenderingTime,
          threadName
        );
      }
    }

    const registries = Object.values(this.startRenderingHash);

    registries.forEach(registry => {
      if (!registry.get)
        this.unnecessary++;

      this.startRenderingArrays.push(registry);
    })

    return {
      report: {
        rendering: this.startRenderingArrays,
        summary: {
          count: this.startRenderingArrays.length + this.numsOfDuplicatedUids,
          duplicates: this.numsOfDuplicatedUids,
          unnecessary: this.unnecessary
        }
      },
    }
  }
}