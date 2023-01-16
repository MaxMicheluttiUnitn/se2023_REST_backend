'use strict';

const { body, query, params, validationResult} = require('express-validator');

exports.add_follow=function(req,res){
    console.log('add follow')
    User.findOneAndUpdate({'chat_id' : req.body.chat_id},{$push: {following: req.body.follow}}, {new:true}, function(err, result){
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).json(result);
        }
    })
}

exports.remove_follow=function(req,res){
    console.log('add follow')
    User.findOneAndUpdate({'chat_id' : req.body.chat_id},{$pop: {following: req.body.follow}}, {new:true}, function(err, result){
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).json(result);
        }
    })
}