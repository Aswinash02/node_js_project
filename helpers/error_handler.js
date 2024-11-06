function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError')
        return res.status(401).sent({
            message: "The user is Not Authorized"
        })
    if (err.name === 'ValidationError')
        return res.status(401).sent({
            message: err
        })

    return res.status(401).sent({
        err
    })
}