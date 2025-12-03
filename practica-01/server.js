const express = require('express')
const app = express()
const logger = require('./middlewares/logger')
const timer = require('./middlewares/timer')
const errorHandler = require('./middlewares/errorHandler')

const playerRoutes = require('./routes/playerRoutes')
const tournamentRoutes = require('./routes/tournamentRoutes')
const matchRoutes = require('./routes/matchRoutes')

app.use(express.json())
app.use(logger)
app.use(timer)

app.use('/players', playerRoutes)
app.use('/tournaments', tournamentRoutes)
app.use('/matches', matchRoutes)

app.use(errorHandler)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})