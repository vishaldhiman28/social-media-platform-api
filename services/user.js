const moment        = require ('moment');
const followerModel = require ('models/follower'); 
const { fips } = require('crypto');

const userProfile = { };

userProfile.generateUserProfile = async ({ reqId, userId }) => {
	let responseData = {
        statusCode : '',
        msg        : '',
        result     : { }
    }

	try { 
		// find user followers
		let followers = await followerModel.getFollowersData ({ followeeId : userId })
		
		// finding whom user followes
		let followee  = await followerModel.getFollowersData ({ userId });
		/*
			we can find also find user follower and following using one database query, using or condition,
			but in that case we will have to right a logic to find follower and followee count using loop
		*/

		responseData.statusCode = 200;
        responseData.msg        = `fetched user profile.`;
		responseData.result     = {
			userName  : userId,
			followers : followers ? followers.length : 0,
			following : followee  ? followee.length : 0,
		}

		console.debug ({ reqId, data : responseData}, 'user follow success.');

		return responseData;
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { followeeId } }, 'unknown error occured while following given id');
        throw "user follow service error";
	}
};

module.exports = userProfile;