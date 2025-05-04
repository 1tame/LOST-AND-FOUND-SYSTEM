const mongoose = require('mongoose');

const user = mongoose.Schema({

    user_name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    /*validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email address format',
      },
*/
    password : {
        type : String,
        required : true,
    },

    Phone : {
        type : Number,
        required : true
    },

    createdAt : {
        type : Date, 
        default : Date.now
    }


});

module.exports = mongoose.model('userInfo', user);