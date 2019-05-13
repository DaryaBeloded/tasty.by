const jwt = require('jsonwebtoken');
const fs = require("fs");

function verifyToken(req, res, next) {
	console.log('verifyToken')

  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  const privateKey = fs.readFileSync('private.key');

  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;