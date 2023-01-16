'use strict';

const { body, query, params, validationResult} = require('express-validator');

exports.list_all_games=function(req,res){
    console.log('all events')
    const collection  = mongoose.connection.db.collection("Games");
    collection.find({}).toArray(function(err, data){
        //console.log(data)
        if (err)
            res.status(500).send(err);
        else{
            res.status(200).json(data);
        }
    });
}

exports.get_one_game=function(req,res){
    console.log('single event')
    let gameID = req.params.gameID
    const collection  = mongoose.connection.db.collection("Games");
    collection.find({}).toArray(function(err, data){
        if (err)
            res.status(500).send(err);
        else if(data.length==0)
            res.status(404).json({ success:false,message: 'Error: No game was found' });
        else{
            let position=-1;
            let index=0;
            while(index<data.length){
                if (data[index]['id'] == gameID){
                    position=index;break;
                }
                index+=1;
            }
            if(position===-1){
                res.status(404).json({ success:false,message: 'Error: Game with id '+gameID+' not found' });
            }else{
                res.status(200).json(data[position]);
            }
        }
    });
}

exports.list_all_games_of_season=function(req,res){
    console.log('all events')
    const collection  = mongoose.connection.db.collection("Season");
    collection.find({}).toArray(function(err, data){
        if (err)
            res.status(500).send(err);
        else{
            res.status(200).json(data);
        }
    });
}

exports.get_one_game_from_season=function(req,res){
    console.log('single event')
    let gameID = req.params.gameID
    const collection  = mongoose.connection.db.collection("Season");
    collection.find({}).toArray(function(err, data){
        if (err)
            res.status(500).send(err);
        else if(data.length==0)
            res.status(404).json({ success:false,message: 'Error: No game was found' });
        else{
            let position=-1;
            let index=0;
            while(index<data.length){
                if (data[index]['id'] == gameID){
                    position=index;break;
                }
                index+=1;
            }
            if(position===-1){
                res.status(404).json({ success:false,message: 'Error: Game with id '+gameID+' not found' });
            }else{
                res.status(200).json(data[position]);
            }
        }
    });
}