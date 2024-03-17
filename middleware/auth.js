const jwt = require("jsonwebtoken");


function authenticateToken(req, res, next) {
  const excludedEndpoints = ["/user/signupUser", "/user/fetchProduct"];

  if (excludedEndpoints.includes(req.originalUrl)) {
    return next();
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ success:false, message: 'No token provided',error:'' });
  }

  try {
    req.user = jwt.verify(token, 'secret_key');
    console.log('token verified');
    console.log(req.user.email); // Optional logging
    next();
  } catch (error) {
    res.status(401).json({ success:false ,message: 'Invalid token', error:'' });
  }
}

function generateAccessToken(email) {
  return jwt.sign({ email }, 'secret_key', { expiresIn: "15 days" });
}

module.exports = { authenticateToken, generateAccessToken };
