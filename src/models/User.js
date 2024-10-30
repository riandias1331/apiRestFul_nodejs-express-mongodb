const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    LastName: { type: String, required: true },
    age: { type: Number, required: true }
})

const UserModel = mongoose.model('dataBaseUsers', UserSchema)

module.exports = UserModel