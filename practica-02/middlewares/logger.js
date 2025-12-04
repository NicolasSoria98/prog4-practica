function logger (res,req,next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    next()
}
module.exports = {logger}