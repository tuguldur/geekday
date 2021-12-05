const express = require("express");
const router = express.Router();

router.get("/", (_, res) => res.json({ flag: process.env.FLAG_GET }));
router.post("/", (_, res) => res.json({ flag: process.env.FLAG_POST }));
router.put("/", (_, res) => res.json({ flag: process.env.FLAG_PUT }));
router.delete("/", (_, res) => res.json({ flag: process.env.FLAG_DELETE }));
router.use("/woody", require("./woody"));
module.exports = router;
