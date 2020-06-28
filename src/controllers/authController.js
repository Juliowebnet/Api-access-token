const  {Router} = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const User = require('../models/user');
const verifyToken = require('./veifyToken');
// const user = require('../models/user');


router.post('/signup', async (req, res, next) => {
    const {username, email, password} = req.body;
    const user = new User({
        username : username,
        email : email,
        password : password
    })
    user.password = await user.encryptPassword(user.password); 
    await user.save();

    const token = jwt.sign({id: user._id}, process.env.SECRECT, {
        expiresIn: 60 * 60 * 24
    })

    res.status(200).json({auth: true , token})
    
})

router.get('/me', verifyToken, async (req, res, next) => {

    const user = await User.findById(req.userId, {password: 0});
    if(!user){
        res.status(404).json({message: 'No user found'})
    }

    res.json(user)
})

router.post('/signin', async (req, res, next) => {
    const {email, password} = req.body;

    const user = await User.findOne({email: email});
    if(!user){
        return res.status(404).send("The email doesn't exists");
    }

    const validPassword = await user.validatePassword(password);
    
    if(!validPassword){
        return res.status(401).json({auth: false, token: null});
    }

    const token = jwt.sign({id: user._id}, process.env.SECRECT, {
        expiresIn: 60 * 60 * 24
    })

    res.json({auth: true, token})
})


module.exports = router;
