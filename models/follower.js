const moment         = require ('moment');
const followerSchema = require ('schemas/followers');
const db             = require ('db');

let followerModel = {};
let DBModel = null;

db.emitter.on ('db-connected', () => {
	let connection = db.db();

	DBModel = connection.model ('follower', followerSchema);
});

followerModel.follow = async (inputData) => {
    try {
	    let responseData = await DBModel.create (inputData);
        return responseData;
    }
    catch (err) { 
        console.error ( { err : err.stack,  data : { inputData } }, 'unknown error occured during insert op for follower model in the db');
        throw "insert op failed for follower model";
    }
}

followerModel.unFollow = async (inputData) => {
    try {
	    let responseData = await DBModel.findOneAndDelete (inputData);
        return responseData;
    }
    catch (err) { 
        console.error ( { err : err.stack,  data : { inputData } }, 'unknown error occured during delete op for follower model');
        throw "delete op failed for follower model";
    }
}

followerModel.getFollowersData = async (query) => {
    try {
	    let responseData = await DBModel.find (query);
        return responseData;
    }
    catch (err) { 
        console.error ( { err : err.stack,  data : { inputData } }, 'unknown error occured during find op for follower');
        throw "error ouccred while finding follower";
    }
}


module.exports = followerModel;