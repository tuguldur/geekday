const express = require("express");
const app = express();
const cookie_parser = require("cookie-parser");
require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookie_parser());
app.use("/api", require("./src/routes"));
if (process.env.NODE_ENV === "production")
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
    app.use((req, res, next) => {
      const error = new Error("Not found");
      error.status = 404;
      next(error);
    });
    // error handler middleware
    app.use((error, req, res, next) => {
      error.status && (error = error.status);
      return res.status(error || 500).send({
        error: {
          status: false,
          message: "Error",
        },
      });
    });
  });
app.listen(PORT, () => console.log(`challenge running on port ${PORT}`));
