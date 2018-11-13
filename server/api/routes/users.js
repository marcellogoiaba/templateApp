const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/Users');

router.post('/register', (req, res, next) => {
    console.log(req.body);
    if(!req.body.email  || !req.body.password || !req.body.firstName){
        res.json({
            success: false,
            message: 'Please enter all required fields!'
        })
    }
    else{
        let newUser = new User({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password
        })
        newUser.save((err) => {
           if(err){
              console.log(err);
              res.status(409);
              res.json({
                 message: err
              })
           }
           else{
            res.status(201);
            res.json({content:newUser});
           }
        })
    }
});

router.get('/', (req, res, next) => {
    User.find({}, (err, users) => {
       console.log(users)
       res.json(users)
    })
})

router.delete('/:id', (req, res) => {
   User.findById(req.params.id, (err, user) => {
      if(err){
         console.log(err);
         res.json({
            message: err
         })
      }
      else{
         user.isDeleted = true;
         user.save((err, user) => {
            if(err){
               console.log(err);
            }
            res.json({content:user})
         })
      }
   })
}); 

router.put('/:id', (req, res) => {
   console.log(`Updating user`);

   User.findById(req.params.id,  (err, user) => {
       if (err) {
           res.status(404);
           res.send({message: 'Resource not found'});
       } else{
           console.log(req.body);
           user.set(req.body);

           user.save((err, user) => {
               console.log(user);

             res.json({content:user});
           });
       }

   });
});



module.exports = router;