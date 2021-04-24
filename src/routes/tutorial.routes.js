const express = require("express");
const router = express.Router();
const excelController = require("../controllers/tutorials/excel.controller");
const upload = require("../middlewares/upload");


let routes = (app) => {
  router.get("/download", excelController.download);

  router.post("/upload", upload.single("file"), excelController.uploadFile);
  router.get("/tutorials", excelController.getTutorials);

  app.use("/api/excel", router);
};

module.exports = routes;
