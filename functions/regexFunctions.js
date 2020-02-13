module.exports = {
    getThreadLine: function(line){
        const rg = /\[[a-zA-Z]+-[0-9]+\]/gm.exec(line);
        return rg ? rg[0] : '';
    },
    getUid: function(line){
        const rg = /[0-9]+-[0-9]{4}/gm.exec(line);
        return rg ? rg[0] : '';
    },
    getDateTimeExecution: function(line){
        const rg = /[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3}/gm.exec(line);
        return rg ? rg[0] : '';
    },
    getDocumentNum: function(line){
        const rg = /[0-9]{5,6},\s[0-9]{1,3}/gm.exec(line);
        let documentNums = {};

        if(rg){
            let nums = rg[0].split(', ');
            documentNums = {
                documentNum: nums[0],
                page: nums[1]
            }
                
        }
        return documentNums;
    },
    isGetRenderingLine: function(line){
        return line.match(/Executing request getRendering with arguments/gm);
    },
    isStartRenderingReturnLine: function(line){
        return line.match(/Service startRendering returned [0-9]+-[0-9]{4}/gm);
    },
    isStartRenderingRequestLine: function(line){
        return line.match(/^.*Executing request startRendering\b.*$/gm);
    }
}