const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

async function authenticate(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
              if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        try {
            const user = await User.findByPk(decoded.id_user);
            if (!user) {
                return res.status(401).json({ error: 'User no longer exists' });
            }

            req.user = user;
            req.decoded = decoded;
            next();
        } catch (dbError) {
            return res.status(500).json({ error: 'Failed to verify user' });
        }
    });
}

module.exports = authenticate;
