const express = require('express');
const Item = require('../model/Item');


exports.addItem = async (req, res) => {
    try {
        const item = new Item(req.body);
        const savedItem = await item.save();
        res.status(200).json(savedItem);
    } catch(error) {
        res.status(500).json({messsage: error.messsage});
    }
};


exports.deleteAll = async (req, res) =>{
    try {
        const result = Item.deleteMany({});
        res.status(200).json({message:"all items deleted successfully", deletedCount: result.deletedCount});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.deleteItem = async (req, res) =>{
    const {ItemId} = req.body; 

    try{
        const result = await Item.findByIdAndDelete(ItemId);
        res.status(200).json({message:"Item deleted successfully", deletedCount: result.deletedCount});
    }catch(error){
        res.status(400).json({message:error.message});
    }
}


exports.getAll = async(req, res) =>{
    try{
        const result = await Item.find();
        res.status(201).json(result);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};


exports.SearchLostItem = async(req, res) =>{
    const{Item_Type} = req.body;
    const{city} = req.body.location || {};

    const query = {Item_Type: {$regex: new RegExp(Item_Type,'i')},
       'location.city':{$regex: new RegExp(city,'i')},
       status: 'Found'
}
    try{
        const result = await Item.find(query).select('Item_Type location.city');
        res.status(200).json(result); 
    }catch(error){
        res.status(500).json({message: error.message});
    }
};


