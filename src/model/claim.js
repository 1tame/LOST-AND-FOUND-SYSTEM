const mongoose = require("mongoose");


const claimSchema = mongoose.Schema({
    item_id : {
        type : mongoose.Schema.Types.ObjectId, ref : 'item',
    },

    claimant_id : {
        type : mongoose.Schema.Types.ObjectId, ref : 'userInfo',
    },

    message : {
        
        item_name : {type: String, required: true},
        item_color : { type: String, required: true },
        model : { type: String},
        special_Tag_or_symbol : {type: String},
        specific_location: {type: String}
    },

    status : {
        type: String, enum: ['Pending', 'Rejected', 'Approved']
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Claim', claimSchema);