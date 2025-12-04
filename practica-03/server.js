const express = require('express')
const app = express()
//AGREGAR IMPORTS RUTAS Y MIDDLEWARE
const ownerRoutes = require('./routes/ownersRoutes')
const petsRoutes = require('./routes/petsRoutes')
const appointmentsRoutes = require('./routes/appointmentsRoutes')
const logger = require('./middlewares/logger')
const timer = require('./middlewares/timer')
const errorHandler = require('./middlewares/errorHandler')


//MIDDLEWARE GLOBALES
app.use(express.json())
app.use(logger)
app.use(timer)
//AGREGAR ROUTES
app.use('/owners', ownerRoutes)
app.use('/pets', petsRoutes)
app.use('appointments', appointmentsRoutes)
//MIDDLEWARE ERROR
app.use(errorHandler)
const PORT = 3000
app.listen(PORT)