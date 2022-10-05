const moment          = require ('moment');
const { errorConfig } = require ('config');
const ErrorSerialize  = require ('errorSerialize');
const postService     = require ('services/posts');

const contoller = { };

contoller.createPost = async (req, res) => {
	let reqId  = req.id;
	let title  = req.body.title;
    let desc   = req.body.description;
	let userId = req.user.userId;

	const successStatusCode       = 200;
	const internalErrorStatusCode = 500;

	try {
		let newPostResult = await postService.newPost ({ reqId, title, desc, userId });
	
		if (newPostResult.statusCode !== successStatusCode) {
			/*
				sending Error object 
			*/
			res.status (newPostResult.statusCode).send (
				new ErrorSerialize (
					errorConfig[newPostResult.statusCode], 
					newPostResult.statusCode, 
					newPostResult.msg
				)
			);
			return;
		}

		res.status (successStatusCode).send (JSON.stringify (newPostResult.result));
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { title, desc, userId } }, 'error in creating new post');
		res.status (internalErrorStatusCode).send (
			new ErrorSerialize (
				errorConfig[internalErrorStatusCode], 
				internalErrorStatusCode,
				'New post creation failed'
			)
		);
	}
};

contoller.deletePost = async (req, res) => {
	let reqId  = req.id;
	let postId = req.params.id;
	let userId = req.user.userId;

	const successStatusCode 	  = 200;
	const internalErrorStatusCode = 500;

	try {
		let deletePostResult = await postService.deletePost ({ reqId, postId, userId });
	
		if (deletePostResult.statusCode !== successStatusCode) {
			/*
				sending Error object 
			*/
			res.status (deletePostResult.statusCode).send (
				new ErrorSerialize (
					errorConfig[deletePostResult.statusCode], 
					deletePostResult.statusCode, 
					deletePostResult.msg
				)
			);
			return;
		}

		res.status (successStatusCode).send (JSON.stringify (deletePostResult));
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { title, desc, userId } }, 'error in deleting post');
		res.status (internalErrorStatusCode).send (
			new ErrorSerialize (
				errorConfig[internalErrorStatusCode], 
				internalErrorStatusCode,
				'Post deletion failed'
			)
		);
	}
};

contoller.likePost = async (req, res) => {
	let reqId  = req.id;
	let postId = req.params.id;
	let userId = req.user.userId;

	const successStatusCode 	  = 200;
	const internalErrorStatusCode = 500;

	try {
		let likePostResult = await postService.likePost ({ reqId, postId, userId });
	
		if (likePostResult.statusCode !== successStatusCode) {
			/*
				sending Error object 
			*/
			res.status (likePostResult.statusCode).send (
				new ErrorSerialize (
					errorConfig[likePostResult.statusCode], 
					likePostResult.statusCode, 
					likePostResult.msg
				)
			);
			return;
		}

		res.status (successStatusCode).send (JSON.stringify (likePostResult));
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { postId, userId } }, 'error in liking the post');
		res.status (internalErrorStatusCode).send (
			new ErrorSerialize (
				errorConfig[internalErrorStatusCode], 
				internalErrorStatusCode,
				'Post like failed'
			)
		);
	}
};

contoller.unlikePost = async (req, res) => {
	let reqId  = req.id;
	let postId = req.params.id;
	let userId = req.user.userId;

	const successStatusCode 	  = 200;
	const internalErrorStatusCode = 500;

	try {
		let unlikePostResult = await postService.unlikePost ({ reqId, postId, userId });
	
		if (unlikePostResult.statusCode !== successStatusCode) {
			/*
				sending Error object 
			*/
			res.status (unlikePostResult.statusCode).send (
				new ErrorSerialize (
					errorConfig[unlikePostResult.statusCode], 
					unlikePostResult.statusCode, 
					unlikePostResult.msg
				)
			);
			return;
		}

		res.status (successStatusCode).send (JSON.stringify (unlikePostResult));
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { postId, userId } }, 'error in unliking the post');
		res.status (internalErrorStatusCode).send (
			new ErrorSerialize (
				errorConfig[internalErrorStatusCode], 
				internalErrorStatusCode,
				'Post Unlike failed'
			)
		);
	}
};

contoller.addCommentToPost = async (req, res) => {
	let reqId   = req.id;
	let postId  = req.params.id;
	let comment = req.body.comment; 
	let userId  = req.user.userId;

	const successStatusCode 	  = 200;
	const internalErrorStatusCode = 500;

	try {
		let addCommentToPostResult = await postService.addCommentToPost ({ reqId, comment, postId, userId });
	
		if (addCommentToPostResult.statusCode !== successStatusCode) {
			/*
				sending Error object 
			*/
			res.status (addCommentToPostResult.statusCode).send (
				new ErrorSerialize (
					errorConfig[addCommentToPostResult.statusCode], 
					addCommentToPostResult.statusCode, 
					addCommentToPostResult.msg
				)
			);
			return;
		}

		res.status (successStatusCode).send (JSON.stringify (addCommentToPostResult.result));
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { postId, userId, comment } }, 'error in adding comment to the post');
		res.status (internalErrorStatusCode).send (
			new ErrorSerialize (
				errorConfig[internalErrorStatusCode], 
				internalErrorStatusCode,
				'Adding comment to post failed'
			)
		);
	}
};

contoller.findSinglePost = async (req, res) => {
	let reqId   = req.id;
	let postId  = req.params.id;
	let userId  = req.user.userId;

	const successStatusCode 	  = 200;
	const internalErrorStatusCode = 500;

	try {
		let postFindResult = await postService.findSinglePost ({ reqId, postId, userId });
	
		if (postFindResult.statusCode !== successStatusCode) {
			/*
				sending Error object 
			*/
			res.status (postFindResult.statusCode).send (
				new ErrorSerialize (
					errorConfig[postFindResult.statusCode], 
					postFindResult.statusCode, 
					postFindResult.msg
				)
			);
			return;
		}

		res.status (successStatusCode).send (JSON.stringify (postFindResult.result));
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { postId, userId } }, 'error in finding the post');
		res.status (internalErrorStatusCode).send (
			new ErrorSerialize (
				errorConfig[internalErrorStatusCode], 
				internalErrorStatusCode,
				'post find failed'
			)
		);
	}
};

contoller.findAllPosts = async (req, res) => {
	let reqId   = req.id;
	let postId  = req.params.id;
	let userId  = req.user.userId;

	const successStatusCode 	  = 200;
	const internalErrorStatusCode = 500;

	try {
		let postsFindResult = await postService.findAllPosts ({ reqId, postId, userId });
	
		if (postsFindResult.statusCode !== successStatusCode) {
			/*
				sending Error object 
			*/
			res.status (postsFindResult.statusCode).send (
				new ErrorSerialize (
					errorConfig[postsFindResult.statusCode], 
					postsFindResult.statusCode, 
					postsFindResult.msg
				)
			);
			return;
		}

		res.status (successStatusCode).send (JSON.stringify (postsFindResult.result));
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : {postId, userId } }, 'error in finding the all posts of user');
		res.status (internalErrorStatusCode).send (
			new ErrorSerialize (
				errorConfig[internalErrorStatusCode], 
				internalErrorStatusCode,
				'all posts find failed'
			)
		);
	}
};

module.exports = contoller;