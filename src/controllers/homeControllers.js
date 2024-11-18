const User = require('../models/User.js')

const bcrypt = require('bcrypt')

exports.get = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

// exports.create = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const user = new User({ name, email, password });
//         await user.save();
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

exports.create = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            name,
            email,
            password: hashPassword
        });
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


exports.deletedAll =  async (req, res) => {
    try {
        const user = await User.deleteMany();
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        } res.status(200).json({ message: 'Todos os produtos foram deletados.'  });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao deletar os produtos.' });
    }
};


