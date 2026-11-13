const express = require('express');
const router = express.Router()
const {body} = require('express-validator')
const captainController = require('../controllers/captain.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register',[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be of 3 character'),
    body('password').isLength({min:6}).withMessage('password must be 6 charcter long'),
    body('vehicle.color').isLength({min:3}).withMessage('must be 3 character long'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must be 3 character long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('invalid input')
],captainController.registerCaptain)
module.exports =router;

router.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:3}).withMessage('password must be 6 character long')
], captainController.loginCaptain)
router.get('/profile',authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);