const express = require('express');
const User = require('../model/userInfo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.addUser = async(req, res, next) => {

    try {
        const {user_name, email, password, Phone} = req.body;
        
        const hashedPwd = await bcrypt.hash(password, 10);


        const user = new User({user_name, email, password: hashedPwd, Phone});
        const savedInfo = await user.save();
        res.status(201).json(savedInfo);
    } catch (error) {
        next(error);
        
    }

};

exports.login = async(req, res, next)=>{
    const jwt_secret = process.env.jwt;

     if (!jwt_secret) {
        console.error("FATAL ERROR: jwt_secret is not defined in environment variables.");
        return next(new Error("Server configuration error."));
    }

    try{

    const{user_name, password} = req.body;
    const user = await User.findOne({user_name});
    
    
    if(!user){
       return res.status(400).json({error: "user not found"});
    }

    const pwdCheck = await bcrypt.compare(password, user.password);

    if(!pwdCheck){
       return res.status(400).json({error: "authentication failed"});
    }

    //jwt
    const payload = {
        userName: user.user_name,
        userId: user._id

    };

    const options = {
        expiresIn: '1h'
    };

    const token = jwt.sign(payload,jwt_secret, options);

    res.status(200).json({
        message: 'login successful',
        token: token,
        userId: user._id,
        userName: user.user_name
    });


    }catch(error){
        next(error);
    }

};




exports.deleteAll = async(req, res, next) => {
    try {
        const result = await User.deleteMany({});
        res.status(200).json({message: 'All user info cleaned.', deletedCount: result.deletedCount})
    } catch (error) {
        next(error);

    }
};


exports.getAll = async(req, res, next)=>{
    try{
        const result = await User.find();
        res.status(200).json(result);
    }catch (error) {
        next(error);

    }
}

