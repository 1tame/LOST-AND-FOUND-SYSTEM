const express = require('express');
const Claim = require('../model/claim');
const Item = require('../model/Item');

exports.claimItem = async (req, res, next) => {
  try {
    const claimData = req.body;

    if (req.file) {
      claimData.image = req.file.path; // image path to DB
    }

    const claimInfo = new Claim(claimData);
    const savedInfo = await claimInfo.save();

    res.status(200).json(savedInfo);
  } catch (error) {
    next(error);
  }
};



exports.viewClaim = async(req, res, next)=>{
    const {id: itemId} = req.params;
    const userId = req.user.userId;

    try{
        const item = await Item.findById(itemId);

       if(item.createdBy.toString() !== userId){
            res.status(501).json({message: "permissoin needed"})
        };

        const result = await Claim.find({item_id: itemId}).populate('claimant_id', 'Phone email');
        res.status(200).json(result);
    }catch(error){
        next(error);
    }
};


exports.clearInfo = async(req, res, next) =>{
    try{
        const result = await Claim.deleteMany({});
        res.status(201).json({message: "claim info cleaned successfully", deletedCount: result.deletedCount});
    }catch(error){
        next(error);
    }
};


exports.getAll = async(req, res, next)=>{
    try{
        const result = await Claim.find();
        res.status(200).json(result);
    }catch(error){
        next(error);
    };
};