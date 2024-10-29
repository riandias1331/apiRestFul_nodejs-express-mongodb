require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3333

const route = require('./')
app.use(route)

const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTION)
    .then(() => {
        console.log('Connected')
        app.emit('DataBase')
    })
    .catch((e) => console.log(e))

app.on('DataBase', () => {
    app.listen(port, () => {
        console.log('server is running in: ', port)
        console.log('http://localhost:3333')
    })
})