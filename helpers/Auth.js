const jwt = require('jsonwebtoken')

module.exports = {
        validator: (req, res, next) => {
                let beartoken = req.headers.authorization
                let token = beartoken.split(" ")
                if (token[0] == 'Bearer') {
                        token = token[1]
                }
                jwt.verify(token, '123456', (err, obj) => {
                        if (err) res.status(403).json({mensagem: "Invalid Token"})
                        else {
                                req.user = obj.user
                                next()
                        }
                })
        }
}