const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

const User=require('../models/user');

exports.user_singup=(req,res,next)=>{

    User.find({email: req.body.email})
    .exec()
    .then(userexists =>{
        if(userexists.length>=1){
            return res.status(422).json({
                 message: 'Mail Exist'

            });

        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    }); 
        
                }   
                else{
                    const user= new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        username: req.body.username,
                        userroll: req.body.userroll                
                    });
                    user.save()
                    .then( result =>{
                        res.status(201).json({
                            message: 'User created'        
                        });
        
                    })
                    .catch( err =>{
                        res.status(500).json({
                            error: err
        
                        });
        
                    });
        
                }
            });
        }
    }).catch( err =>{
        res.status(500).json({
            error: err

        });

    });
}

exports.user_login=(req,res,next)=>{
    User.find({email: req.body.email}).exec()
    .then(users=>{
        if(users.length < 1){
            return res.status(401).json({
                message: 'Auth failed'
            });

        };
        bcrypt.compare(req.body.password,users[0].password, (err,result)=>{
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                });

            }
            if(result){

                const token = jwt.sign({
                    email : users[0].email,
                    userId: users[0]._id
                },process.env.JWT_KEY,
                {
                    expiresIn: "24h",

                }
                )
                return res.status(200).json({
                    message: 'Auth succesful',
                    token: token,
                    userId: users[0]._id,
                    username: users[0].username,
                    userroll: users[0].userroll

                });

            }
            res.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

}

exports.user_delete=(req,res,next)=>{
    User.deleteOne({ Id: req.params.userId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: 'User deleted'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}