const moment      = require ('moment');
const authService = require ('services/auth');
const { errorConfig } = require ('config');
const ErrorSerialize  = require ('errorSerialize');
const contoller = { };

contoller.authenticate = async (req, res) => {
	/*
		user information from req
	*/
	let reqId = req.id;
	let email    = req.body.email;
	let password = req.body.password;

	const successStatusCode       = 200;
	const internalErrorStatusCode = 500;

	try {
		let userValidationResult = await authService.userValidation ({ reqId, email, password });
	
		if (userValidationResult.statusCode !== successStatusCode) {
			/*
				sending Error object if user validation is not successful
			*/
			res.status (userValidationResult.statusCode).send (
				new ErrorSerialize (
					errorConfig[userValidationResult.statusCode], 
					userValidationResult.statusCode, 
					userValidationResult.msg
				)
			);
			return;
		}

		let tokenGenerationResult = authService.generateToken ({ reqId, email, userId : userValidationResult.result.userId });

		res.status (successStatusCode).send (JSON.stringify (tokenGenerationResult.result));
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { email, password } }, 'error in authenticating user');
		res.status (internalErrorStatusCode).send (
			new ErrorSerialize (
				errorConfig[internalErrorStatusCode], 
				internalErrorStatusCode, 
				'User Auth Failed'
			)
		);
	}
};

contoller.verifyToken = (req, res, next) => { 
	let reqId        = req.id;
	const authHeader = (req.headers['authorization']);
	let token        = authHeader && authHeader.split(' ')[1];

	const successStatusCode       = 200;
	const internalErrorStatusCode = 500;
	/* 
		token should be given in authorization hearder, if not we can also check in body, query, or x-access-token
	*/
	if (!token)
		token = req.body.token || req.query.token || req.headers["x-access-token"];

	try {

		validateTokenData = authService.validateToken ({ reqId, token }); 

		if (validateTokenData.statusCode !== successStatusCode) {
			res.status (validateTokenData.statusCode).send (
				new ErrorSerialize (
					errorConfig[validateTokenData.statusCode], 
					validateTokenData.statusCode, 
					validateTokenData.msg
				)
			);
			return;
		}

		//token verification success;
		req.user = validateTokenData.result;

		next ();
	}
	catch {
		console.error ( { reqId, err : err.stack,  data : { token } }, 'error in verifying token');
		res.status (internalErrorStatusCode).send (
			new ErrorSerialize (
				errorConfig[internalErrorStatusCode], 
				internalErrorStatusCode, 
				'Token Verification Failed'
			)
		);
	}
}

module.exports = contoller;