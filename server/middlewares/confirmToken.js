const jwt =require('jsonwebtoken')
// const secret = require('../../config').jwt
const privateKey = '926'

// 检查token是否正确
const confirmToken = (req, res, next) => {
    // console.log(req.headers.authorization)
    if (!req.headers.authorization) {
        res.status(401).end('no token')
    } else {
        const token = req.headers.authorization.split(' ')[1]
        // console.log(token)
        jwt.verify(token, privateKey, function (err) {
            if (err) {
                res.status(401).end(err.message)
            } else {
              // 通过验证才执行 next()
              next()
            }
        })
    }
    // 如果 next() 写在这里不管验证结果如何 虽然提示报错 但是依然会执行后面的逻辑
    // next()
}

module.exports = confirmToken
