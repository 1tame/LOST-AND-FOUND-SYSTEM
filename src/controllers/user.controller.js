const express = require('express');
const User = require('../model/userInfo');
const bcrypt = require('bcrypt');

exports.addUser = async(req, res) => {

    try {
        const {user_name, email, password, Phone} = req.body;
        
        const hashedPwd = await bcrypt.hash(password);


        const user = new User({user_name, email, password: hashedPwd, Phone});
        const savedInfo = await user.save();
        res.status(201).json(savedInfo);
    } catch (error) {
        res.status(500).json("Couldn't add user");
        
    }

};

exports.deleteAll = async(req, res) => {
    try {
        const result = await User.deleteMany({});
        res.status(200).json({message: 'All user info cleaned.', deletedCount: result.deletedCount})
    } catch (error) {
        res.status(500).json({message: error.message});

    }
};


exports.getAll = async(req, res)=>{
    try{
        const result = await User.find();
        res.status(200).json(result);
    }catch (error) {
        res.status(500).json({message: error.message});

    }
}

