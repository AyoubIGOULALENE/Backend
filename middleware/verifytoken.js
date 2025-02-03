const jwt = require("jsonwebtoken");

// Middleware to verify a Bearer token
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization; // Get the Authorization header
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1]; // Extract the token part
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
            req.user = decoded; // Attach decoded data to request
            next(); // Proceed to next middleware
        } catch (error) {
            res.status(401).json({ message: "Invalid or expired token" }); // Handle verification error
        }
    } else {
        res.status(400).json({ message: "Authorization header missing or improperly formatted" }); // Handle missing or invalid header
    }
}

// Middleware to verify admin privileges
function verifyAdminToken(req, res, next) {
    verifyToken(req, res, () => { // Reuse verifyToken middleware
        if (req.user && req.user.isAdmin) {
            next(); // User is admin, proceed
        } else {
            res.status(403).json({ message: "Access denied: Admins only" }); // Handle non-admin user
        }
    });
}

module.exports = { verifyToken, verifyAdminToken };
