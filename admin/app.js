const express = require("express");
const app = express();
const path = require("path");


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // index refers to index.ejs
   });

app.listen(3000, () => {
  console.log("server started on port 3000");
});