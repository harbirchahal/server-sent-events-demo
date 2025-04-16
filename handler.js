const names = require("./data");

function streamResponse(res, query) {
    // ** Important **
    res.contentType("text/event-stream");

    let id = 1;
    for (const s of names.get(query)) {
      setTimeout(() => {
        res.write(`id: ${Date.now()}\n`);
        res.write(`data: [${query}] ${s}\n\n`);
      }, 1000 * id++);
    }
  
    setTimeout(() => {
      res.write(`id: ${Date.now()}\n`);
      res.write(`event: customEvent\n`);
      res.write(`data: [${query}] A custom-event message\n\n`);
    }, 1000 * id);
}

module.exports = streamResponse
