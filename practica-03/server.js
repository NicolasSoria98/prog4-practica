const express = require('express')
const app = express()

const ownerRoutes = require('./routes/ownersRoutes')
const petsRoutes = require('./routes/petsRoutes')
const appointmentsRoutes = require('./routes/appointmentsRoutes')
const logger = require('./middlewares/logger')
const timer = require('./middlewares/timer')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(logger)
app.use(timer)

app.use('/owners', ownerRoutes)
app.use('/pets', petsRoutes)
app.use('/appointments', appointmentsRoutes)

app.use(errorHandler)
const PORT = 3000
app.listen(PORT, ()=> {
    console.log(`corriendo en puerto ${PORT}`)
})