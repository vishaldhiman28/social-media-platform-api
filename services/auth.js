const moment  = require ('moment');
const bcrypt  = require ('bcryptjs');
const jwt     = require ('jsonwebtoken');
const { 
    dummyUserCredentials, 
    tokenConifg
}             = require ('config')

const auth = { };

auth.userValidation = async ({ reqId, email, password }) => {
    // response format
    let userValidationResult = {
        statusCode : '',
        msg        : '',
        result     : null
    };

	try {

        /*
            we can add email validation also to check if email is a valid mail or not
        */
		if (!email || !password) {
			console.error ( { reqId , data: { email, password }}, 'required email/password is missing.');

            userValidationResult.statusCode = 400;
            userValidationResult.msg        = 'Email/Password missing.';

            return userValidationResult;
		}

        /*
            we have not stored user in database for now
            here we can fetch user data from database, right now user data is present in config file
            and currently we are using only hashed password, we can add salt to it also
        */
		if (email !== dummyUserCredentials.email) {
			console.error ( { reqId,  data: { email, password } }, 'user does not exist.');
            
            userValidationResult.statusCode = 403;
            userValidationResult.msg        = 'User not found.';

            return userValidationResult;	
		}

		let isValidPassword = await bcrypt.compare (password, dummyUserCredentials.password);
        
		if (!isValidPassword) {
	        console.error ( { reqId,  data: { email, password } }, 'password is incorrect.');

            userValidationResult.statusCode = 403;
            userValidationResult.msg        = 'Invalid Password.';
          
			return userValidationResult;
		}

		userValidationResult.statusCode = 200;
        userValidationResult.msg        = "User validaton Success.";
        userValidationResult.result     = {
            email   : email,
            userId  : dummyUserCredentials.userId
        }

		console.debug ({ reqId, data : userValidationResult}, 'user validation success.');

		return userValidationResult;
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { email, password } }, 'unknown error occured in userValidation service');
        throw "userValidation service error";
	}
};

auth.generateToken = ({ reqId, email, userId }) => {
    let responseData = {
        result : {
            token  : '',
            email  : email,
            userId : userId
        }
    }

    try {
		let token = jwt.sign(
            { email, userId },
            tokenConifg.key,
            {
                expiresIn : tokenConifg.expiry
            }
        );

        responseData.result.token = token;

        console.debug ({ reqId, responseData }, 'token generation success.');

        return responseData;
    }
    catch (err) {
        console.error ( { reqId, err : err.stack, userId : userId }, 'unknown error while generating token');
        throw "generateToken serive error";
    }
};

auth.validateToken = ({ reqId, token }) => {
    let responseData = {
        statusCode : '',
        msg        : '',
        result     : {
        }
    }

    try {
		if (!token) {	
			console.error ( { reqId, token : token }, 'token not provided.');
	
            responseData.statusCode = 403; 
            responseData.msg        = 'Auth token not provided.';
			return responseData;
		}

        const decoded = jwt.verify(
            token, 
            tokenConifg.key
        );
       
        responseData.statusCode = 200;
        responseData.msg        = "Valid auth token",
        responseData.result     = decoded;

        console.debug ({ reqId, responseData }, 'token validation success.');
    }
    catch (err) {
        responseData.statusCode = 401; 
        responseData.msg        = 'Authentication failed.';
    }

    return responseData;
};

module.exports = auth;