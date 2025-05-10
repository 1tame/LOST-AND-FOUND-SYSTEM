const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async ()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database connected.");
    }catch(error){
        console.log(error.message);
    }
};

//retry logic to be add

module.exports = connectDb;
