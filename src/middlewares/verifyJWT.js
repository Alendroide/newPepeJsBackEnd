require('dotenv').config()
const jwt = require('jsonwebtoken');

const verifyJWT = () => async(req,res,next) => {
    try{
        const token = req.headers['authorization']?.split(" ")[1];
        if(!token){
            return res.status(401).json({msg:"Not logged in"});
        }
        const verified = jwt.verify(token,process.env.SECRET_WORD);
        if(!verified){
            return res.status(401).json({msg:"Invalid token"});
        }
        req.user = verified.id
        next()
    }
    catch(error){
        if(error.message == 'invalid token'){
            return res.status(400).json({msg:"Invalid Token"});
        }
        console.error(error);
        res.status(500).json({msg:"Internal server error"});
    }
}

module.exports = verifyJWT;