const blacklistTokenModel = require('../model/blacklistToken.model');
const userModel = require('../model/user.model');
const userService = require('../services/user.service')
const {validationResult}= require('express-validator')
const jwt = require('jsonwebtoken')
async function registerUser(req , res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    // console.log(req.body)
    const {fullname, email, password} = req.body
    const useralreadyExists = await userModel.findOne({email})
    if(useralreadyExists){
        return res.status(400).json({
            message:'user already exists'
        })
    }
    const hashedpassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedpassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token,user})
}

async function loginUser(req, res){
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({
            message:'invalid email or password'
        })
    }
    const isMatch= await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({
            message:'invalid credentials'
        });
    }
    const token = user.generateAuthToken();

    res.cookie('token', token)
    // console.log(token);
    res.status(200).json({
        token , user
    })
}


async function getUserProfile(req, res){


    res.status(200).json(req.user);
}

async function logoutUser(req , res){
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({token}) ;
    res.clearCookie('token');

    res.status(200).json({
        message: 'logged out'
    })
}


module.exports = {registerUser, loginUser , getUserProfile , logoutUser}