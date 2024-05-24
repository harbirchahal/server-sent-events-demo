const express = require("express");
const names = require("./data");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/stream", (req, res) => {
  const query = req.query?.q ?? "";

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
});

app.listen(port);
console.log(`Server started at http://localhost:${port}`);
