const express = require("express");
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

//this app accept a post and give a log on the req data. After that response with mensage
app.post("/", (req, res) => {
  console.log(req.body);
  res.json({
    message: "We received your request body!",
  });
});
app.listen(port, () => console.log("listening on port " + port));
