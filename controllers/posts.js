const moment          = require ('moment');
const { errorConfig } = require ('config');
const ErrorSerialize  = require ('errorSerialize');
const postService     = require ('services/posts');

const contoller = { };

contoller.createPost = async (req, res) => {
	/*
		user to follow information from req
	*/
	let reqId  = req.id;
	let title  = req.body.title;
    let desc   = req.body.description;
	let userId = req.user.userId;

	const successStatusCode       = 200;
	const internalErrorStatusCode = 500;

	try {
		let postResult = await postService.newPost ({ reqId, title, desc, userId });
	
		if (postResult.statusCode !== successStatusCode) {
			/*
				sending Error object 
			*/
			res.status (postResult.statusCode).send (
				new ErrorSerialize (
					errorConfig[postResult.statusCode], 
					postResult.statusCode, 
					postResult.msg
				)
			);
			return;
		}

		res.status (successStatusCode).send (JSON.stringify (postResult.result));
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

module.exports = contoller;