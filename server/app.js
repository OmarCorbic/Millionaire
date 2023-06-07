require("express-async-errors");
require("dotenv").config();

const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const express = require("express");
const app = express();

// connectdb
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/auth");
const scoreRouter = require("./routes/score");

// middleware
const routeNotFoundMiddleware = require("./middleware/route-not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticateUser = require("./middleware/authentication");

app.set("trust proxy", 1);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());
app.use(express.static("build"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/score", authenticateUser, scoreRouter);

app.use(errorHandlerMiddleware);
app.use(routeNotFoundMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
