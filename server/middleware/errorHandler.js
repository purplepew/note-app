const errorHandler = (err, req, res, next) => {
    console.log(err)
    const message = err.message ?? 'Internal server error'
    const status = err.status ?? 500
    res.status(status).json({message})
}

export default errorHandler