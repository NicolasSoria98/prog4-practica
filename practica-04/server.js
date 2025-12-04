const express = require('express');
const app = express()
const guestsRoutes = require('./routes/guestsRoutes')
const roomsRoutes = require('./routes/roomsRoutes')
const reservationsRoutes = require('./routes/reservationsRoutes')
const errorHandler = require('./middlewares/errorHandler')
const logger = require('./middlewares/logger')
const timer = require('./middlewares/timer')

app.use(express.json())
app.use(logger)
app.use(timer)


app.use('/guests', guestsRoutes)
app.use('/rooms', roomsRoutes)
app.use('/reservations', reservationsRoutes)

app.use(errorHandler)

const port = 3000;
app.listen(PORT, () => {
    console.log(`corriendo en: ${PORT}`)
})