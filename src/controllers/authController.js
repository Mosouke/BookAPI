const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; 


exports.register = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        res.status(201).json({ message : 'User created successfully', userId: user.id });
    }catch (err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Invalide email or password' });
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalide email or password' });
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    }catch (err) {
        next(err);
    }
}