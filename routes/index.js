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

	appServer.get  ('/api/user',       userController.userProfile);
	
	appServer.post   ('/api/posts',        postsController.createPost);
	appServer.delete ('/api/posts/:id',    postsController.deletePost);
	appServer.post   ('/api/like/:id',     postsController.likePost);
	appServer.post   ('/api/unlike/:id',   postsController.unlikePost);
	appServer.post   ('/api/comments/:id', postsController.addCommentToPost);
	appServer.get    ('/api/posts/:id',    postsController.findSinglePost);
	appServer.get    ('/api/all_posts',    postsController.findAllPosts)

	return;
};

module.exports = routes;