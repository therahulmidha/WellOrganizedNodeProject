module.exports = function (req, res, next) {
    // Get the token from header
    const token = req.headers["x-auth-token"];

    //Check if no token
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied", data: null });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token", data: null });
    }
}