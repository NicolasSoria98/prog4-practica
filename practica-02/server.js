const express = require('express');
const app = express()
const logger = require('./middlewares/logger');
const timer = require('./middlewares/timer');

const booksRoutes = require ('./routes/bookRoutes')
const userRoutes = require('./routes/userRoutes')
const loanRoutes = require ('./routes/loanRoutes')

app.use(express.json())
app.use(logger)
app.use(timer)

app.use('/books', booksRoutes)
app.use('/users', userRoutes)
app.use('/loans', loanRoutes)

app.use(errorHandler)

const PORT = 3000
app.listen(PORT);