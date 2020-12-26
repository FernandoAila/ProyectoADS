const express = require("express");
const bodyParser= require("body-parser");
const cors = require('cors');

require("dotenv").config();

const app = express();

app.use(cors());
app.enable("trust proxy");
app.use(express.json());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", require("./routes/authRoutes"));
app.use("/test",require("./routes/test"));
app.use("/users",require("./routes/users"));
app.use("/modules",require("./routes/modules"));
app.use("/projects",require("./routes/projectsRoutes"));
app.use("/modulesRoutes",require("./routes/modulesRoutes"));
app.use("/requirements",require("./routes/requirementsRoutes"));
const PUERTO= process.env.PORT||8080;
app.listen(
  PUERTO,()=>
  console.log(`El servidor esta corriendo en el puerto 8080.`)
);