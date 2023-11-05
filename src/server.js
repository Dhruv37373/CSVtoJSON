const express = require("express");
const app = express();
const User = require('./models/User')
const initRoutes = require("./routes/user.routes");


app.use(express.urlencoded({ extended: true }));
initRoutes(app);

User.sync();

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});