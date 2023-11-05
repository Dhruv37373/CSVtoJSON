const express = require("express");
const router = express.Router();
const csvController = require("../controllers/csvController");
const inputfile = require("../middlewares/inputfile");

let routes = (app) => {
  router.post("/upload", inputfile.single("file"), csvController.upload);

  app.use("/api/csv", router);
};

module.exports = routes;