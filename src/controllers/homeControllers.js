const User = require('../models/User.js')

exports.index = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

exports.crete = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        } res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleted = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        } res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



