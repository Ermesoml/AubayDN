const fs = require('fs')
const readline = require('readline')

module.exports = class LogFileReader {
    constructor(filePah){
      this.filePath = filePah;
    }

    getFileContent = function(){
        return readline.createInterface({input: fs.createReadStream(this.filePath)});
    }
}