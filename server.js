const express = require("express");
const app = express();
const port = 3000;

const loggingMiddleware = (req, res, next) => {
  const timeStamp = new Date();
  console.log("request received at: " + timeStamp);
  res.setHeader("X-Codaisseur-Time", timeStamp);
  next();
};

//50% of my request to the server will return 500 error. And other 50% will call next, in this case send a "Hello" to the client
//Obs: this function will be called in a specific route, in this case "/"

function failRandomlyMiddleware(req, res, next) {
  if (Math.random() * 2 >= 1) {
    next();
  } else {
    res.status(500).end();
  }
}

// Middleware at the application level will be called for each request
//OBS: The app.use must comes after middleWare function has been declared
app.use(loggingMiddleware);

app.get("/", failRandomlyMiddleware, (req, res) => res.send("Hello"));

app.get("/foo", (req, res, next) => res.send("foo"));

app.listen(port, () => console.log(`Server listening on port ${port}!`));
