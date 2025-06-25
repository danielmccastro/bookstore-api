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
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(user);
            } else {
                const user = await User.findAll({ raw: true });
                res.json(user);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteUser(req, res) {
        const { id_user } = req.body;
        try {
            const deletedCount = await User.destroy({ where: { id_user } });

            if (deletedCount === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateUser(req, res) {
        const id_user_param = parseInt(req.body.id_user);
        const id_user_token = req.decoded.id_user;

        if (isNaN(id_user_param)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        if (id_user_param !== id_user_token) {
            return res.status(403).json({ error: 'You can only update your own data.' });
        }

        const { name, password, email } = req.body;
        try {
            await User.update({ name, password, email }, { where: { id_user: id_user_param } });
            res.json({ message: 'Data updated successfully.' });
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
                        const token = jwt.sign({ id_user: user.id_user }, process.env.SECRET, { expiresIn: '1d' });
                        return res.json({ auth: true, token: token });
                    } else {
                        res.status(401).json({ error: 'Invalid username or password' });
                    }
                })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};