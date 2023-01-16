'use strict';
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/*const Game_Status = new Schema(
    {
        long:{
            type: String,
            trim: true
        },
        short:{
            type: Number,
            trim: true
        },
    }
)

const Country = new Schema(
    {
        id:{
            type: Number,
            trim: true
        },
        date:{
            type: String,
            trim: true
        },
        code:{
            type: String,
            trim: true
        },
        flag:{
            type: String,
            trim: true
        }
    }
)

const League = new Schema(
    {
        id:{
            type: Number,
            trim: true
        },
        name:{
            type: String,
            trim: true
        },
        type:{
            type: String,
            trim: true
        },
        logo:{
            type: String,
            trim: true
        },
        season:{
            type: Number,
            trim: true
        }
    }
)

const Team=new Schema(
    {
        id:{
            type: Number,
            trim: true
        },
        name:{
            type: String,
            trim: true
        },
        logo:{
            type: String,
            trim: true
        }
    }
)

const Game_Teams=new Schema(
    {
        home:{
            type:Team
        },
        away:{
            type:Team
        }
    }
)

const Game_Scores=new Schema(
    {
        home:{
            type: Number,
            trim: true
        },
        away:{
            type: Number,
            trim: true
        }
    }
)

const Game_Period= new Schema(
    {
        home:{
            type: Number,
            trim: true
        },
        away:{
            type: Number,
            trim: true
        }
    }
)

const Game_Periods=new Schema(
    {
        first:{
            type:Game_Period
        },
        second:{
            type:Game_Period
        },
        third:{
            type:Game_Period
        },
        fourth:{
            type:Game_Period
        },
        fifth:{
            type:Game_Period
        }
    }
)

const Game_Schema = new Schema(
    {
        id:{
            type: Number,
            trim: true
        },
        date:{
            type: String,
            trim: true
        },
        time:{
            type: String,
            trim: true
        },
        timestamp:{
            type: Number,
            trim: true
        },
        timezone:{
            type: String,
            trim: true
        },
        week:{
            type: String,
            trim: true
        },
        status:{
            type: Game_Status,
        },
        country:{
            type: Country
        },
        league:{
            type: League
        },
        teams:{
            type: Game_Teams
        },
        scores:{
            type: Game_Scores
        },
        periods:{
            type: Game_Periods
        }
    }
)*/

const Match_Follow=new Schema(
    {
        match_id:{
            type: Number,
            trim: true
        },
        message_id:{
            type: Number,
            trim: true
        }
    }
)

const User_Schema=new Schema(
    {
        chat_id:{
            type: Number,
            trim: true
        },
        supports_team:{
            type: Number,
            trim: true
        },
        following:{
            type: [Match_Follow]
        }
    }
)





const User = mongoose.model('User', User_Schema);
//const Games = mongoose.model('Games', Game_Schema, 'Games');

module.exports = {
  UserSchema: User
  //GameSchema: Games
};