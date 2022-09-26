const fs = require('fs');
const path = require('path');
const multer = require('multer');
const streams = require('memory-streams');
const upload = multer({ storage: multer.memoryStorage() });

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const stream = new streams.ReadableStream(req.body); 
    for (const key in req) {
        if (req.hasOwnProperty(key)) {
            stream[key] = req[key];
        }
    }
    context.stream = stream;

    upload.any()(stream, null, (err) => {
        const f = context.stream.files[0]
        const p = path.join(__dirname, `./temp/${f.originalname}`);
        fs.writeFileSync(p, f.buffer);
        context.res = { body: `Upload ${f.originalname} done.` };
        context.done();
    });
};