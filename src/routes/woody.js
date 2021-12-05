const express = require("express");
const router = express.Router();
const woody = require("../controllers/woody");
const validator = require("../middlewares/validator");
/**
 * /api/woody:
 */
router.get("/", (req, res) => res.json({ status: true }));
router.post("/mail", validator.woody_mail, woody.mail);
router.get("/agent", woody.agent);
router.post("/register", validator.register, woody.register);
router.get("/@me", woody.me);
// router.get("/register", woody.register);
module.exports = router;
