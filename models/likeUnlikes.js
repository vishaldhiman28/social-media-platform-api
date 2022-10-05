const moment             = require ('moment');
const likesUnlikesSchema = require ('schemas/likesUnlikes');
const db                 = require ('db');

let likesUnlikesModel = {};
let DBModel = null;

db.emitter.on ('db-connected', () => {
	let connection = db.db();

	DBModel = connection.model ('likesunlikes', likesUnlikesSchema);
});

likesUnlikesModel.updateLikeDislike = async ({ query, updates }) => {
    try {
	    let responseData = await DBModel.findOneAndUpdate (    
            query,
            {
                $set : updates
            },
            { upsert: true, new: true }
        );
        return responseData;
    }
    catch (err) { 
        console.error ( { err : err.stack,  data : { query, updates } }, 'unknown error occured during like dislike op for likesUnlikesModel in the db');
        throw "like unlike op failed for likesUnlikesModel";
    }
}

likesUnlikesModel.getLikesOrDislikes = async (query) => {
    try {
	    let responseData = await DBModel.find (query);
        return responseData;
    }
    catch (err) { 
        console.error ( { err : err.stack,  data : { query, updates } }, 'unknown error occured during like dislike op for likesUnlikesModel in the db');
        throw "like unlike op failed for likesUnlikesModel";
    }
}

module.exports = likesUnlikesModel;