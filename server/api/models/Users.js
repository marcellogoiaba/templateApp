const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let userSchema = new Schema({
   firstName: {
      type: String, 
      required: true
   },
   lastName: {
      type: String, 
      required: true
   },
   email: {
      type: String, 
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   createdDate: {
      type: Date,
      default: Date.now()
   },
   isDeleted: {
      type: Boolean,
      default: false
   }
})

userSchema.pre('save', function(next) {
   var user = this;
   if (this.isModified('password') || this.isNew) {
     bcrypt.genSalt(10, function(err, salt) {
       if (err) {
         return next(err);
       }
       bcrypt.hash(user.password, salt, (err, hash) => {
         if (err) {
           return next(err);
         }
         user.password = hash;
         next();
       });
     });
   } else {
     return next();
   }
 });

 userSchema.methods.comparePassword = (pw, cb) => {
   bcrypt.compare(pw, this.password, (err, isMatch) => {
     if (err) {
       return cb(err);
     }
     cb(null, isMatch);
   });
 };

const User = mongoose.model('User', userSchema);
module.exports = User;