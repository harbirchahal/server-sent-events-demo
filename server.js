const express = require("express");
const handle = require("./handler")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

/// QUERY PARAM
app.get("/stream", (req, res) => {
  const query = req.query?.q ?? "";
  handle(res, query)
});

/// PATH PARAM
app.get("/stream/:query", (req, res) => {
  const query = req.params?.query;
  handle(res, query)
});

app.listen(port);
console.log(`Server started at http://localhost:${port}`);
