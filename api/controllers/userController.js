'use strict';

const { body, query, params, validationResult} = require('express-validator');

exports.get_all_users=function(req,res){
    console.log('all users')
    User.find({},function(err, users){
        if (err)
            res.status(500).send(err);
        else{
            res.status(200).json(users);
        }
    }).limit(500);
}

exports.add_user=function(req,res){
    console.log('add user')
    var chat_id=req.body.chat_id
    var supports=req.body.supports
    if(emptyStr(chat_id)){
        res.status(401).json({success:false, message: "Cant create user without chat id"})
    }else{
        req.body.following=[]
        User.findOne({'chat_id':chat_id},function(err, user){
            if (err)
                res.status(500).send(err);
            else if(user==null){
                var new_User = new User(req.body);
                new_User.save(function(err,created){
                    if (err)
                        res.status(500).send(err);
                    else{
                        res.status(201).json(created);
                    }
                })
            }
            else{
                res.status(404).json({ success:false,message: 'Error: User with given id '+chat_id+' already exists' }); 
            }
        })
    }
}

exports.get_one_user=function(req,res){
    console.log('one user')
    let userID = req.params.userID
    User.findOne({'chat_id':userID},function(err, user){
        if (err)
            res.status(500).send(err);
        else if(user===null)
            res.status(404).json({ success:false,message: 'Error: User with id '+userID+' not found' });
        else
            res.status(200).json(user);
    })
}

exports.update_one_user=function(req,res){
    console.log('update user')
    let userID = req.params.userID
    delete req.body.chat_id
    User.findOneAndUpdate({'chat_id':userID},req.body, {new: true}, function(err, updated){
        if (err)
            res.status(500).send(err);
        else{
            res.status(201).json(updated);
        }
    })
}

exports.delete_one_user=function(req,res){
    console.log('delete user')
    let userID = req.params.userID
    User.deleteOne({'chat_id': userID}, function(err,result){
        if (err)
            res.status(500).send(err);
        else{
            res.status(201).json({success:true, message: "Successfully deleted user with chat id "+userID});
        }
    })
}

function emptyStr(s){
    return s===undefined || s===null || s===""
}