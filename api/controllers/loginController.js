'use strict';

exports.check_token= function(req,res){
    console.log('token check')
    var jwt= require("jsonwebtoken")
    var token=req.head.token
    if (!token) 
        res.json({success: false});
    else{
        // decodifico e controllo il token
        jwt.verify(token, process.env.SUPER_SECRET, function(err, decoded) {
            if (err) 
            // se il token non è valido restituisco false
                res.json({success: false});
            else
            // se il token è valido restituisco true
                res.json({success: true});
        });
    }
}

exports.log_in_check = async function(req, res){
    var jwt= require("jsonwebtoken")
    var pw=req.body.password
    console.log("login check")
    // se password non definita restituisco un errore 401
    if(emptyStr(pw)){
        res.status(401).json({success:false,message: 'Error:  password is required' });
    }else{
        let expiration_time=86400;
        if(pw===process.env.PASSWORD){
            var payload = { access: 'ok'}
            var options = { expiresIn: expiration_time } // expires in 24 hours
            var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
            res.status(201)
                .json({ success: true, message: 'Welcome to the API, Enjoy your token!', token: token});
        }else{
            res.status(401).json({success: false, message:'Error: password is incorrect'})
        }
    }
}

function emptyStr(s){
    return s===undefined || s===null || s===""
}