  
const express = require("express");
const cors = require('cors');
require("dotenv").config();

const app = express();

app.use(cors());
app.enable("trust proxy");
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/test",require("./routes/test"))
app.listen(
  process.env.PORT || 3001,
  console.log("el servidor esta corriendo en el puerto 3000")
);