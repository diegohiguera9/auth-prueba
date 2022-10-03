require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./db");
const userRoute = require("./api/user/user.route");
const roleRoute = require("./api/role/role.route");
const projectRoute = require("./api/projects/projects.route");
const { auth } = require("./utils/auth");
const errorHandler = require("./api/middleware/errorHandler");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());


app.use('/user',userRoute)
app.use('/role',roleRoute)
app.use('/projects',projectRoute)

//Eror handlres las piece of middleware
app.use(errorHandler)

const port = 8080;
connect();

app.listen(port, () => {
  console.log(`Loading server in http localhost:${port}`);
});
