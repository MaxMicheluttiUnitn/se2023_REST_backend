'use strict';

const { body, query, params, validationResult} = require('express-validator');

exports.get_teams=function(req,res){
    console.log('all teams')
    const collection  = mongoose.connection.db.collection("Teams");
    collection.find({}).toArray(function(err, data){
        if (err)
            res.status(500).send(err);
        else{
            res.status(200).json(data);
        }
    });
}

exports.get_one_team=function(req,res){
    console.log('single team')
    let teamID = req.params.teamID
    const collection  = mongoose.connection.db.collection("Teams");
    collection.find({}).toArray(function(err, data){
        if (err)
            res.status(500).send(err);
        else if(data.length==0)
            res.status(404).json({ success:false,message: 'Error: Team with id '+teamID+' not found' });
        else{
            let position=-1;
            let index=0;
            while(index<data.length){
                if (data[index]['id'] == teamID){
                    position=index;break;
                }
                index+=1;
            }
            if(position===-1){
                res.status(404).json({ success:false,message: 'Error: Team with id '+teamID+' not found' });
            }else{
                res.status(200).json(data[position]);
            }
        }
    });
}

exports.get_team_games=function(req,res){
    console.log('team games')
    let teamID = req.params.teamID
    const collection  = mongoose.connection.db.collection("Teams");
    collection.find({}).toArray(function(err, data){
        if (err)
            res.status(500).send(err);
        else if(data.length==0)
            res.status(404).json({ success:false,message: 'Error: Team with id '+teamID+' not found' });
        else{
            let found=false
            let index=0
            while(index<data.length){
                if (data[index]['id'] == teamID){
                    found=true;break;
                }
                index+=1
            }
            if(!found){
                res.status(404).json({ success:false,message: 'Error: Team with id '+teamID+' not found' });
            }else{
                const game_collection  = mongoose.connection.db.collection("Season");
                game_collection.find({}).toArray(function(err, data){
                    if (err)
                        res.status(500).send(err);
                    else if(data.length==0)
                        res.status(200).json([]);
                    else{
                        let results=[]
                        for(let game of data){
                            if(game['teams']['home']['id']==teamID){
                                results.push(game)
                            }else if(game['teams']['away']['id']==teamID){
                                results.push(game)
                            }
                        }
                        if(results.length===0){
                            res.status(200).json([]);
                        }else{
                            res.status(200).json(results)
                        }
                    }
                })
            }
        }
    });
}

exports.get_team_played_games=function(req,res){
    console.log('team old games')
    let teamID = req.params.teamID
    const collection  = mongoose.connection.db.collection("Teams");
    collection.find({}).toArray(function(err, data){
        if (err)
            res.status(500).send(err);
        else if(data.length==0)
            res.status(404).json({ success:false,message: 'Error: Team with id '+teamID+' not found' });
        else{
            let found=false
            let index=0
            while(index<data.length){
                if (data[index]['id'] == teamID){
                    found=true;break;
                }
                index+=1
            }
            if(!found){
                res.status(404).json({ success:false,message: 'Error: Team with id '+teamID+' not found' });
            }else{
                const game_collection  = mongoose.connection.db.collection("Season");
                game_collection.find({}).toArray(function(err, data){
                    if (err)
                        res.status(500).send(err);
                    else if(data.length==0)
                        res.status(200).json([]);
                    else{
                        let results=[]
                        for(let game of data){
                            if(game['status']['short']==="FT"){
                                if(game['teams']['home']['id']==teamID){
                                    results.push(game)
                                }else if(game['teams']['away']['id']==teamID){
                                    results.push(game)
                                }
                            }
                        }
                        if(results.length===0){
                            res.status(200).json([]);
                        }else{
                            res.status(200).json(results)
                        }
                    }
                })
            }
        }
    });
}

exports.get_team_future_games=function(req,res){
    console.log('team next games')
    let teamID = req.params.teamID
    const collection  = mongoose.connection.db.collection("Teams");
    collection.find({}).toArray(function(err, data){
        if (err)
            res.status(500).send(err);
        else if(data.length==0)
            res.status(404).json({ success:false,message: 'Error: Team with id '+teamID+' not found' });
        else{
            let found=false
            let index=0
            while(index<data.length){
                if (data[index]['id'] == teamID){
                    found=true;break;
                }
                index+=1
            }
            if(!found){
                res.status(404).json({ success:false,message: 'Error: Team with id '+teamID+' not found' });
            }else{
                const game_collection  = mongoose.connection.db.collection("Season");
                game_collection.find({}).toArray(function(err, data){
                    if (err)
                        res.status(500).send(err);
                    else if(data.length==0)
                        res.status(200).json([]);
                    else{
                        let results=[]
                        for(let game of data){
                            if(game['status']['short']!=="FT"){
                                if(game['teams']['home']['id']==teamID){
                                    results.push(game)
                                }else if(game['teams']['away']['id']==teamID){
                                    results.push(game)
                                }
                            }
                        }
                        if(results.length===0){
                            res.status(200).json([]);
                        }else{
                            res.status(200).json(results)
                        }
                    }
                })
            }
        }
    });
}

exports.get_standings=function(req,res){
    console.log('standings')
    const collection  = mongoose.connection.db.collection("Standings");
    collection.find({}).toArray(function(err, data){
        if (err)
            res.status(500).send(err);
        else if(data.length==0)
            res.status(404).json({ success:false,message: 'Error: Standings not found' });
        else{
            data.sort((a,b)=>a['position']-b['position'])
            res.status(200).json(data);
        }
    })
}
