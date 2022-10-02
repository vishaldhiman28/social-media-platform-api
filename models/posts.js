const moment      = require ('moment');
const postsSchema = require ('schemas/posts');
const db          = require ('db');

let postsModel = {};
let DBModel = null;

db.emitter.on ('db-connected', () => {
	var connection = db.db();

	DBModel = connection.model ('posts', postsSchema);
});

postsModel.createNewPost = async (inputData) => {
    try {
	    let responseData = await DBModel.create (inputData);
        return responseData;
    }
    catch (err) { 
        console.error ( { err : err.stack,  data : { inputData } }, 'unknown error occured during insert op for posts model in the db');
        throw "insert op failed for posts model";
    }
}

module.exports = postsModel;