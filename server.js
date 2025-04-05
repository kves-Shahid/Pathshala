const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./backend/config/db");


dotenv.config({ path: "./.env" });


connectDB();


const app = express();


app.use(cors()); 
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/user", require("./backend/routes/userRoutes")); 
app.use("/api/v1/learner", require("./backend/routes/learnerRoutes")); 
app.use("/api/v1/material", require("./backend/routes/materialRoutes")); 
app.use("/api/v1/stories", require("./backend/routes/storyRoutes")); 
app.use("/api/v1/press", require("./backend/routes/pressRoutes")); 
app.use("/api/v1/support", require("./backend/routes/supportTextRoutes")); 


app.use((err, req, res, next) => {
  console.error(err.stack.red);
  res.status(500).json({ message: "Something went wrong!" });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`.bgCyan.white
  );
});