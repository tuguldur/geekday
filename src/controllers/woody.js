const { transporter } = require("../lib/mail");
const { validationResult } = require("express-validator");

exports.auth = (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password")
    return res.json({ status: true, flag: process.env.FLAG_WOODY_AUTH });
  else return res.json({ status: false });
};
exports.mail = (req, res) => {
  const { email, name } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errors.array() });
  } else {
    transporter
      .sendMail({
        from: "[Geekday#21] <tuguldur@reverser.mn>",
        to: email,
        subject: "Flag Woody email",
        html: `<div>
        <p>Hello ${name} here's your flag 🧐</p>
        <img src="https://media3.giphy.com/media/e1s8C0YnnfjlRf7mEr/giphy.gif" alt="Awkward John Krasinski GIF by Saturday Night Live" style="width: 100%; height: 100%;" />
        <!-- flag: ${process.env.FLAG_WOODY_MAIL} -->
        </div>`,
      })
      .then(() => res.json({ status: true, msg: "Check your inbox" }))
      .catch(() => res.status(500).json({ status: false }));
  }
};
exports.agent = (req, res) => {
  let useragent = req.headers["user-agent"];
  if (useragent.toLowerCase() === "woody")
    return res.json({ status: true, flag: process.env.FLAG_WOODY_AGENT });
  else return res.status(403).json({ status: false, msg: "Invalid Agent" });
};
exports.register = (req, res) => {
  const { name, username } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errors.array() });
  } else {
    const user = {
      name,
      username,
      role: "user",
    };
    const encoded_user = Buffer.from(JSON.stringify(user)).toString("base64");
    return res.cookie("auth", encoded_user).json({ status: true });
  }
};
exports.me = (req, res) => {
  if (!req.cookies.auth) {
    return res.status(403).json({ status: true, msg: "Эхлээд нэвтрэнэ үү." });
  } else if (req.cookies.auth) {
    try {
      const decoded_user = JSON.parse(
        Buffer.from(req.cookies.auth, "base64").toString("ascii")
      );
      if (decoded_user.role.toLowerCase() === "admin")
        return res.json({ status: true, flag: process.env.FLAG_WOODY_COOKIE });
      else
        return res
          .status(403)
          .json({ status: false, msg: "та admin биш байна." });
    } catch (error) {
      return res.clearCookie("auth").status(400).json({
        status: false,
        msg: "Алдаатай хүсэлт илгээсэн байна та дахин нэвтэрнэ үү.",
      });
    }
  }
};
