const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY; // 環境変数から取得

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //   console.log("Received Token:", token); // 受信したトークンを表示
  if (token == null) {
    console.log("No token provided");
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res.sendStatus(403);
    }
    console.log("Token verified successfully:"); // トークン検証結果を表示
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
