const moment      = require ('moment');
const userService = require ('services/user');
const { errorConfig } = require ('config');
const ErrorSerialize  = require ('errorSerialize');

const controller = { };

controller.userProfile = async (req, res) => {
	/*
		user information from req
	*/
	let reqId    = req.id;
	let userId   = req.user.userId;

	const successStatusCode       = 200;
	const internalErrorStatusCode = 500;

	try {
		let userProfileResult = await userService.generateUserProfile ({ reqId, userId });
	
		res.status (successStatusCode).send (JSON.stringify (userProfileResult.result));
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { userId } }, 'error occurred while fetching user profile');
		res.status (internalErrorStatusCode).send (
			new ErrorSerialize (
				errorConfig[internalErrorStatusCode], 
				internalErrorStatusCode, 
				'User Profile Fetch Failed'
			)
		);
	}
};

module.exports = controller;