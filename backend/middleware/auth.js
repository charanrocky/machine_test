const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // ✅ Assign decoded user ID (adminId) to req.user
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = auth;
