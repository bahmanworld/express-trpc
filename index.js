const express = require("express");

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "hello world!" });
});

app.listen(3000, () => {
  console.log("listening on port 3000...");
});

module.exports = app;
