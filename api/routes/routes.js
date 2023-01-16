'use strict';

module.exports = function(app) {
    var GameController = require('../controllers/gameController');
    var UserController=require('../controllers/userController');
    var VolleyController = require('../controllers/volleyController');
    var LoginCheck = require('../controllers/loginController');
    var FollowController = require('../controllers/followingController')

    // public routes
    app.route('/login')
        .post(LoginCheck.log_in_check);

    app.route('/season')
        .get(GameController.list_all_games_of_season);

    app.route('/season/:gameID')
        .get(GameController.get_one_game_from_season);

    app.route('/games')
        .get(GameController.list_all_games);

    app.route('/games/:gameID')
        .get(GameController.get_one_game);

    app.route('/team')
        .get(VolleyController.get_teams);

    app.route('/team/:teamID')
        .get(VolleyController.get_one_team);  

    app.route('/team/:teamID/games')
        .get(VolleyController.get_team_games);

    app.route('/team/:teamID/old_games')
        .get(VolleyController.get_team_played_games);
    
    app.route('/team/:teamID/next_games')
        .get(VolleyController.get_team_future_games);

    app.route('/standings')
        .get(VolleyController.get_standings);

    // protected routes
    app.route('/users')
        .get(Token_Check.tokenChecker,UserController.get_all_users)
        .post(Token_Check.tokenChecker,UserController.add_user);

    app.route('/users/:userID')
        .get(Token_Check.tokenChecker,UserController.get_one_user)
        .put(Token_Check.tokenChecker,UserController.update_one_user)
        .delete(Token_Check.tokenChecker,UserController.delete_one_user);

    app.route('/follow')
        .post(Token_Check.tokenChecker,FollowController.add_follow);
    
    app.route('/unfollow')
        .post(Token_Check.tokenChecker,FollowController.remove_follow);

  
};