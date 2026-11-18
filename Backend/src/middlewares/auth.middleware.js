const userModel = require('../model/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../model/blacklistToken.model')
const captainModel = require('../model/captain.model')
async function authUser (req , res, next){
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

if(!token)
{
    
    return res.status(401).json({
        message:'unauthorised1'
    })

}

const isBlacklisted = await blacklistTokenModel.findOne({
    tokens: token
})
if(isBlacklisted){
    return res.status(401).json({
        message: 'unauthorised3'
    })
}
try{
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    const user = await userModel.findById(decoded._id)
    req.user= user;
    return next();

}catch(err){
    return res.status(401).json({
        message:'unauthorised2'
    })
}
}

async function authCaptain  (req , res, next){
    const token = req.cookies.token || req.headers.authorization?.split(' ') [1];
    if(!token){
        return res.status(401).json({
            message:'unauthorization'
        })
    }
    const isBlacklisted = await blacklistTokenModel.findOne({token: token})

    if (isBlacklisted){
        return res.status(401).json({
            message: 'unauthorizzed'
        })
    }
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain= captain;
        return next()
    }catch(err){
        res.status(401).json({
            message:'unauthorized'
        })
    }
}
module.exports = {authUser, authCaptain}