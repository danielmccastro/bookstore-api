const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

module.exports = class UserController {
    static async registerUser(req, res) {
        try {
            const { name, password, email } = req.body;
            const user = await User.create({ name, password, email });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getUsers(req, res) {
        const id_user = req.params.id_user;
        try {
            if (id_user) {
                const user = await User.findOne({ where: { id_user } });
                res.json(user);
            } else {
                const user = await User.findAll({ raw: true });
                res.json(user);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async verifyLogin(req, res) {
        try {
            const { name, password } = req.body;
            const user = await User.findOne({ where: { name, password } })
                .then((user) => {
                    if (user) {
                        const token = jwt.sign({ id_user: user.id_user }, process.env.SECRET);
                        return res.json({ auth: true, token: token });
                    } else {
                        res.status(401).json({ error: 'Invalid username or password' });
                    }
                })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async verifyToken(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    // Remove "Bearer " do início do token, se existir
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        console.log('Token recebido:', token);
        console.log('Secret usada:', process.env.SECRET);

        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.decoded = decoded;
        next();
    });
}

};