const moment        = require ('moment');
const followerModel = require ('models/follower'); 
const { 
    followees
}            = require ('config')
const follow = { };

follow.addFollower = async ({ reqId, followeeId, userId }) => {
	let responseData = {
        statusCode : '',
        msg        : '',
        result     : { }
    }

	try { 
		if (!followeeId) {
			console.error ( { reqId , data: { followeeId }}, 'followeeId is missing.');

            responseData.statusCode = 400;
            responseData.msg        = 'Followee Id missing.';

            return responseData;
		}

		/*
			we can add a check here, to see if given followee id is in our system or not.
			right now i have defined valid followees in config
		*/

		if (!followees.includes (followeeId)) {
			console.error ( { reqId , data: { followeeId }}, 'followeeId is invalid.');

            responseData.statusCode = 400;
            responseData.msg        = 'Followee Id is invalid.';

            return responseData;
		}

		/*
			we can add check if user already follows give followee
		    currently it will throw errro because of duplicate key 
		*/

		await followerModel.follow ({
			userId,
			followeeId
		})

		responseData.statusCode = 200;
        responseData.msg        = `User now following ${followeeId}`;

		console.debug ({ reqId, data : responseData}, 'user follow success.');

		return responseData;
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { followeeId } }, 'unknown error occured while following given id');
        throw "user follow service error";
	}
};

follow.removeFollower = async ({ reqId, followeeId, userId }) => {
	let responseData = {
        statusCode : '',
        msg        : '',
        result     : { }
    }

	try { 
		if (!followeeId) {
			console.error ( { reqId , data: { followeeId }}, 'followeeId is missing.');

            responseData.statusCode = 400;
            responseData.msg        = 'Followee Id missing.';

            return responseData;
		}

		/*
			we can add a check here, to see if given followee id is in our system or not.
			right now i have defined valid followees in config
		*/

		if (!followees.includes (followeeId)) {
			console.error ( { reqId , data: { followeeId }}, 'followeeId is invalid.');

            responseData.statusCode = 400;
            responseData.msg        = 'Followee Id is invalid.';

            return responseData;
		}

		/*
			we can add a check here, to see if user follows given followee or not 
		*/

		await followerModel.unFollow ({
			userId,
			followeeId
		})

		responseData.statusCode = 200;
        responseData.msg        = `User not following ${followeeId} now.`;

		console.debug ({ reqId, data : responseData}, 'user unfollow success.');

		return responseData;
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { followeeId } }, 'unknown error occured while unfollowing given id');
        throw "user unfollow service error";
	}
};

module.exports = follow;