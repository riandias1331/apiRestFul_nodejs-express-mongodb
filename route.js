const express = require('express')
const route = express.Router()

const homeControler  = require('./src/controllers/homeControllers')


route.get('/users', homeControler.index)
route.post('/users', homeControler.create)
route.put('/users/:id', homeControler.update)
route.delete('/users/:id', homeControler.deleted)


module.exports = route