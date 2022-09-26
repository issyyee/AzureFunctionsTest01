const fs = require('fs');
const q = require('q');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const fileType = context.bindingData.type;
    const files = {
        "txt": "dummy.txt"
    }
    const fileName = files[fileType];
    const filePath = './temp/' + fileName;

    const rawFile = await q.nfcall(fs.readFile, filePath);
    const fileBuffer = buffer.from(rawFile);

    context.res = {
    status: 202,
    body: fileBuffer,
    headers: {
        "Content-Disposition": "inline"
    }
    };context.done();

};
