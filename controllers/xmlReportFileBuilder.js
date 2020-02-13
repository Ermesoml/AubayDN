const fs = require('fs');
const builder = require('xmlbuilder');

module.exports = class XMLReportBuilder{
  static saveReportToXml(report){
    let xml = builder.create(
      report
    ).end({ pretty: true });
  
    fs.writeFile('./output/result.xml', xml.toString({pretty: true}), function(err) {
      if(err) { 
        console.log(err);
      } 
      console.log("The file was saved!");
    });
  }
}