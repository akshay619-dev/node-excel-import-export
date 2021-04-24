const express = require("express");
const connectDB = require("./config/db.config");
const app = express();

global.__basedir = __dirname;

//Initialize DB
connectDB();

//Initialize Routes
const initRoutes = require("./routes/tutorial.routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

const port = 5566;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
