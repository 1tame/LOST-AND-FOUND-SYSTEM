const mongoose = require('mongoose');


const ItemSchema = mongoose.Schema({

    Item_Type : {
        type: String,
        required: true
    },

    Item_name : {
        type: String,
        required : true
    },

    description: {
        type : String,
        required : true
    },

    location : {
        //region: {type: String},
        city : {type: String},
        specific_place : {type: String}
    },

    status : {
        type :String,
        enum : ['Lost', 'Found'],
        required : true

    },

    createdAt : {
        type : Date,
        default : Date.now
    }, 

   createdBy : {
        type: mongoose.Schema.Types.ObjectId, ref : 'userInfo',
       // required : true
    }

});

module.exports = mongoose.model('item', ItemSchema);