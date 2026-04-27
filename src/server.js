const express = require("express");
const connectDB = require("./config/database");
const UserRouter = require("./routes/User");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", UserRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

module.exports = app;
