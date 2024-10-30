const express = require('express')
const route = express.Router()

const homeControler  = require('./src/controllers/homeControllers')


route.get('/', homeControler.index)
route.post('/', homeControler.crete)
route.post('/', homeControler.update)
route.delete('/', homeControler.deleted)

module.exports = route