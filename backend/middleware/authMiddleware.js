import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 STRICT VALIDATION
    if (!decoded.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // ✅ STANDARD STRUCTURE
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      name: decoded.name,
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ message: "Token failed" });
  }
};