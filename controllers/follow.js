const moment          = require ('moment');
const { errorConfig } = require ('config');
const ErrorSerialize  = require ('errorSerialize');
const followService   = require ('services/follow');

const contoller = { };

contoller.follow = async (req, res) => {
	/*
		user to follow information from req
	*/
	let reqId      = req.id;
	let followeeId = req.params.id;
	let userId     = req.user.userId;

	const successStatusCode       = 200;
	const internalErrorStatusCode = 500;

	try {
		let addFollowerResult = await followService.addFollower ({ reqId, followeeId, userId });
	
		if (addFollowerResult.statusCode !== successStatusCode) {
			/*
				sending Error object 
			*/
			res.status (addFollowerResult.statusCode).send (
				new ErrorSerialize (
					errorConfig[addFollowerResult.statusCode], 
					addFollowerResult.statusCode, 
					addFollowerResult.msg
				)
			);
			return;
		}

		res.status (successStatusCode).send (JSON.stringify (addFollowerResult));
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { followeeId } }, 'error in following user');
		res.status (internalErrorStatusCode).send (
			new ErrorSerialize (
				errorConfig[internalErrorStatusCode], 
				internalErrorStatusCode,
				'User follow failed'
			)
		);
	}
};

contoller.unfollow = async (req, res) => {
	/*
		user to unfollow information from req
	*/
	let reqId      = req.id;
	let followeeId = req.params.id;
	let userId     = req.user.userId;

	const successStatusCode       = 200;
	const internalErrorStatusCode = 500;

	try {
		let removeFollowerResult = await followService.removeFollower ({ reqId, followeeId, userId });
	
		if (removeFollowerResult.statusCode !== successStatusCode) {
			/*
				sending Error object 
			*/
			res.status (removeFollowerResult.statusCode).send (
				new ErrorSerialize (
					errorConfig[removeFollowerResult.statusCode], 
					removeFollowerResult.statusCode, 
					removeFollowerResult.msg
				)
			);
			return;
		}

		res.status (successStatusCode).send (JSON.stringify (removeFollowerResult));
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { followeeId } }, 'error in unfollowing user');
		res.status (internalErrorStatusCode).send (
			new ErrorSerialize (
				errorConfig[internalErrorStatusCode], 
				internalErrorStatusCode,
				'User unfollow failed'
			)
		);
	}
};

module.exports = contoller;