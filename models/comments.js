const moment         = require ('moment');
const commentsSchema = require ('schemas/comments');
const db             = require ('db');

let commentsModel = {};
let DBModel = null;

db.emitter.on ('db-connected', () => {
	let connection = db.db();

	DBModel = connection.model ('comments', commentsSchema);
});

commentsModel.addComment = async (inputData) => {
    try {
	    let responseData = await DBModel.create (inputData);
        return responseData;
    }
    catch (err) { 
        console.error ( { err : err.stack,  data : { inputData } }, 'unknown error occured during add comment op for comment model in the db');
        throw "add comment op failed for comment model";
    }
}

module.exports = commentsModel;