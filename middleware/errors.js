const pageNotFound = (req, res) => {
    res.status(404).json({
        success:false,
        message:'404 page not found'
    })
}

const errorStatus = (err, req, res, next) => {
    res.status(err.status || 500).json({
        success:false,
        message: err.message || 'internal server error'
    })
}

export {pageNotFound, errorStatus}