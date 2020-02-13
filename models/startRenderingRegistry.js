module.exports = class StartRenderingRegistry {
    documentID = '';
    page = '';
    uid = '';
    start = [];
    get = [];
    thread = '';

    constructor(documentID, page, startRenderingCommand, thread){
      this.documentID = documentID;
      this.page = page;
      this.start = startRenderingCommand;
      this.thread = thread;
    }
}