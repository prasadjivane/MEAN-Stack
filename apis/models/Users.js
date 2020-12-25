const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({
   firstname: {
      type: String
   },
   lastname: {
      type: String
   },
   email: {
      type: String
   },
   phonenumber: {
      type: Number
   },
   profileimage:{
       type:String
   }
}, {
   collection: 'users'
})

module.exports = mongoose.model('Users', Users)