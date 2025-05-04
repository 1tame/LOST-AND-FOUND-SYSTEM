const express = require('express');
const Claim = require('../model/claim');
const Item = require('../model/Item');

exports.claimItem = async(req, res) =>{
    
    try{
    const claimInfo = new Claim(req.body);
    const savedInfo = await claimInfo.save();
    
    res.status(200).json(savedInfo);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};


exports.viewClaim = async(req, res)=>{
    const {id: itemId} = req.params;
    const userId = req.body.claimant_id;

    try{
        const item = await Item.findById(itemId);

       if(item.createdBy.toString() !== userId){
            res.status(501).json({message: "permissoin needed"})
        };

        const result = await Claim.find({item_id: itemId}).populate('claimant_id', 'Phone email');
        res.status(200).json(result);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};


exports.clearInfo = async(req, res) =>{
    try{
        const result = await Claim.deleteMany({});
        res.status(201).json({message: "claim info cleaned successfully", deletedCount: result.deletedCount});
    }catch(error){
        res.status(201).json({message: error.message});
    }
};


exports.getAll = async(req, res)=>{
    try{
        const result = await Claim.find();
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({message: error.message});
    };
}