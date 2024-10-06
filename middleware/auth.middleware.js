var jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) => {

try {
    
    const token = req.headers.authorization.split(" ")[1]
    var decoded = jwt.verify(token,  process.env.SECRET_KEY);

    if(decoded){
        req.userId = decoded.userId
        next()
    }else{
        res.send("Unauthorised")
    }

    
} catch (error) {
    res.status(403).json({Msg : error})
}
}

module.exports = authMiddleware