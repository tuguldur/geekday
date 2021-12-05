const express = require("express");
const app = express();
const cookie_parser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookie_parser());
app.use("/api", require("./src/routes"));

app.listen(PORT, () => console.log(`challenge running on port ${PORT}`));
