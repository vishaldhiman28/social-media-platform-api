const moment      = require ('moment');
const postsSchema = require ('schemas/posts');
const db          = require ('db');

let postsModel = {};
let DBModel = null;

db.emitter.on ('db-connected', () => {
	let connection = db.db();

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

postsModel.removePost = async (query) => {
    try {
	    let responseData = await DBModel.findOneAndDelete (query);
        return responseData;
    }
    catch (err) { 
        console.error ( { err : err.stack,  data : { query } }, 'unknown error occured during delete op for posts model in the db');
        throw "delete op failed for posts model";
    }
}

postsModel.getSinglePost = async (query) => {
    try {
	    let responseData = await DBModel.aggregate ([
            {
                $match : {
                    ...query
                }
            },
            {
                $lookup : {
                    from         : 'comments',
                    localField   : 'id',
                    foreignField : 'postId',
                    as           : 'comments'
                }
            },
        ]);

        responseData = responseData.length ? responseData[0] : responseData;

        return responseData;
    }
    catch (err) { 
        console.error ( { err : err.stack,  data : { query } }, 'unknown error occured during find single post op for posts model in the db');
        throw "single post find op failed for posts model";
    }
}

postsModel.getAllPosts = async (query) => {
    try {
	     let responseData = await DBModel.aggregate ([
            {
                $match : {
                    ...query
                }
            },
            {
				$sort : { 'createdAt' : -1 }  // sort by post creation time
			},
            {
                $lookup : {
                    from         : 'comments',
                    localField   : 'id',
                    foreignField : 'postId',
                    as           : 'comments'
                }
            },
            {
                $lookup : {
                    from         : 'likesunlikes',
                    localField   : 'id',
                    foreignField : 'postId',
                    as           : 'likes',
                    pipeline     : [{
                        $match : { isLiked : true }
                    }]
                }
            },
            { $addFields: {likes: {$size: "$likes"}}}
        ]);

        return responseData;
    }
    catch (err) { 
        console.error ( { err : err.stack,  data : { query } }, 'unknown error occured during find all posts op for posts model in the db');
        throw "all posts find op failed for posts model";
    }
}

module.exports = postsModel;