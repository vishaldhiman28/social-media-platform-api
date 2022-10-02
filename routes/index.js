const express       = require ('express');
const {v4 : uuidv4} = require('uuid')
const authController   = require ('controllers/auth'); 
const followController = require ('controllers/follow'); 
const userController   = require ('controllers/user');
const postsController  = require ('controllers/posts');

const routes = { };

routes.init = (appServer) => {

	//adding unique id to each request obeject
	appServer.use((req, res, next) => {
		req.id = uuidv4();
		next();
	});

	//to check if server is up
	appServer.get ('/ping', (req, res, next) => { 
		return res.send ('pong').status (200);
	});

	appServer.post ('/api/authenicate', authController.authenticate);

	//added token verification middleware for all protected routes;
	appServer.use (authController.verifyToken);

	//follow unfollow routes
	appServer.post ('/api/follow/:id',   followController.follow);
	appServer.post ('/api/unfollow/:id', followController.unfollow);

	appServer.get  ('/api/user', userController.userProfile);
	appServer.post ('/api/posts', postsController.createPost);

	return;
};

module.exports = routes;