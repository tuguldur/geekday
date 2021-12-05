const { check } = require("express-validator");
exports.woody_mail = [check("email").isEmail(), check("name").notEmpty()];
exports.register = [
  check("name").notEmpty(),
  check("username").notEmpty(),
  check("password").notEmpty(),
];
