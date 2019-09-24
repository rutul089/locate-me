const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,  process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        if (error.message == "jwt expired") {
            console.log(error + " Exp");
            return res.status(200).json({
                isSuccess: false,
                message: "Token is not valid",
                error_code: 21
            });
        } else {
            console.log(error);
            return res.status(200).json({
                isSuccess: false,
                message: "Token is not valid",
                error_code: 21
            });
        }
        return res.status(401).json({
            message: "Auth failed"
        });
    }
}
