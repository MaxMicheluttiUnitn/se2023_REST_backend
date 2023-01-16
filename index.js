express = require('express');
mongoSanitize = require('express-mongo-sanitize');
jwt = require("jsonwebtoken");
bodyParser = require('body-parser');
Token_Check=require("./api/token_check/tokenChecker")

mongoose = require('mongoose');
mongoose.set('strictQuery', true);
Schemas = require('./api/models/schemas');
//Game = Schemas.GameSchema;
User = Schemas.UserSchema;
//Following = Schemas.FollowingSchema;

require('dotenv').config();
app = express();
port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(mongoSanitize());

mongoose.Promise = global.Promise;
console.log(process.env.DB_LINK)

try{
    mongoose.connect(process.env.DB_LINK, { autoIndex: false });

    console.log("Starting server...");
    
    //Database connection
    mongoose.Promise = global.Promise;
    console.log("Connecting to " + process.env.DB_LINK);
    mongoose.connect(process.env.DB_LINK);

    var connection = mongoose.connection;

    var routes = require('./api/routes/routes'); //importing route
    routes(app); //register the route

    app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
    });

    app.listen(port);

    console.log('REST API server started on port ' + port);
}catch(err){
    console.log(err)
}

module.exports=app
