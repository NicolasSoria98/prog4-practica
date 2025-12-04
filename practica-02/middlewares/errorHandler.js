function errorHandler(err, req, res, next) {
    let statusCode = 500;
    let message ='error en el servidor';

    if(err.message.includes('no encontrado')) {
        statusCode = 404;
        message = err.message;
    }
    if(err.message.includes('obligatorio')) {
        statusCode = 400;
        message = err.message;
    }
    if(err.message.includes('duplicado')) {
        statusCode = 409;
        message = err.message;
    }
    if (err.message.includes('no permitido')) {
        statusCode= 403;
        message = err.message;
    }
    res.status(statusCode).json({
        error: message,
        timeStamp: new Date().toISOString()
    })
}

module.exports = errorHandler;