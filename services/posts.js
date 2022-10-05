const moment             = require ('moment');
const postsModel         = require ('models/posts');
const likeUnlikesModel   = require ('models/likeUnlikes');
const commentsModel      = require ('models/comments');
const utils              = require ('utils');

const posts = { };

posts.newPost = async ({ reqId, title, desc, userId }) => {
	let responseData = {
        statusCode : '',
        msg        : '',
        result     : { }
    }
    const MAX_TITLE_LENGTH = 20;
    const MAX_DESC_LENGTH  = 240;

	try { 
        /*
            we can seperate title and desc validation, right now I am combining them  
        */   
		if (!title || !desc) {
			console.error ( { reqId , data: { title, desc, userId }}, 'title and description, both are required.');

            responseData.statusCode = 400;
            responseData.msg        = 'title/desc missing.';

            return responseData;
		}

        if (title.length > MAX_TITLE_LENGTH || MAX_DESC_LENGTH > 240) {
            console.error ( { reqId , data: { title, desc, userId }}, 'title and description length, criteria not matched');

            responseData.statusCode = 400;
            responseData.msg        = `Title can not have nore than ${MAX_TITLE_LENGTH} and Description can not have more than ${MAX_DESC_LENGTH}`;

            return responseData;
        }

        // generating post id using custom funtion
        let postId = utils.generatePostId ();
		
        let databaseResult = await postsModel.createNewPost ({
            id     : postId,
            userId : userId,
            title  : title,
            desc   : desc
		});

		responseData.statusCode = 200;
        responseData.msg        = `Post created`;
        responseData.result     = {
            postId     : postId,
            title      : title,
            description: desc,
            createdAt  : databaseResult.createdAt
        }
		console.debug ({ reqId, data : responseData }, 'post create success.');

		return responseData;
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { title, desc, userId } }, 'post create failed');
        throw "post create service error";
	}
};

posts.deletePost = async ({ reqId, postId, userId }) => {
	let responseData = {
        statusCode : '',
        msg        : '',
        result     : { }
    }

	try { 
        
		if (!postId) {
			console.error ( { reqId , data: { postId, userId }}, 'postId is missing.');

            responseData.statusCode = 400;
            responseData.msg        = 'postId missing.';

            return responseData;
		}

        let databaseResult = await postsModel.removePost ({
            id : postId,
		});

		responseData.statusCode = 200;
        responseData.msg        = `Post Deleted`;

		console.debug ({ reqId, data : responseData, databaseResult }, 'post delete success.');

		return responseData;
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { postId, userId } }, 'post delete service failed');
        throw "post delete service error";
	}
};

posts.likePost = async ({ reqId, postId, userId }) => {
	let responseData = {
        statusCode : '',
        msg        : '',
        result     : { }
    }

	try { 
        
		if (!postId) {
			console.error ( { reqId , data: { postId, userId }}, 'postId is missing.');

            responseData.statusCode = 400;
            responseData.msg        = 'postId missing.';

            return responseData;
		}

        let databaseResult = await likeUnlikesModel.updateLikeDislike ({
            query : {
                postId,
                userId,
            },
            updates : {
                isLiked : true
            }
        });

		responseData.statusCode = 200;
        responseData.msg        = `Post Liked`;

		console.debug ({ reqId, data : responseData, databaseResult }, 'post like success.');

		return responseData;
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { postId, userId } }, 'post like service failed');
        throw "post like service error";
	}
};

posts.unlikePost = async ({ reqId, postId, userId }) => {
	let responseData = {
        statusCode : '',
        msg        : '',
        result     : { }
    }

	try { 
        
		if (!postId) {
			console.error ( { reqId , data: { postId, userId }}, 'postId is missing.');

            responseData.statusCode = 400;
            responseData.msg        = 'postId missing.';

            return responseData;
		}

        let databaseResult = await likeUnlikesModel.updateLikeDislike ({
            query : {
                postId,
                userId,
            },
            updates : {
                isLiked : false
            }
        });

		responseData.statusCode = 200;
        responseData.msg        = `Post Unliked`;

		console.debug ({ reqId, data : responseData, databaseResult }, 'post unlike success.');

		return responseData;
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { postId, userId } }, 'post unlike service failed');
        throw "post unlike service error";
	}
};

posts.addCommentToPost = async ({ reqId, comment, postId, userId }) => {
	let responseData = {
        statusCode : '',
        msg        : '',
        result     : { }
    }

	try { 
        
		if (!comment) {
			console.error ( { reqId , data: { comment, postId, userId }}, 'comment is missing.');

            responseData.statusCode = 400;
            responseData.msg        = 'comment missing.';

            return responseData;
		}
        
        if (!postId) {
			console.error ( { reqId , data: { comment, postId, userId }}, 'postId is missing.');

            responseData.statusCode = 400;
            responseData.msg        = 'postId missing.';

            return responseData;
		}

        if (comment.length > 240) {
			console.error ( { reqId , data: { postId, userId }}, 'comment length more than 240 characters.');

            responseData.statusCode = 400;
            responseData.msg        = 'comment length can not be more than 240 characters.';

            return responseData;
		}

        // generating comment id using custom funtion
        let commentId = utils.generateCommentId ();

        let databaseResult = await commentsModel.addComment ({
            postId   : postId,
            commentId: commentId,
            text     : comment,
            userId   : userId
        });

		responseData.statusCode = 200;
        responseData.msg        = `Comment Added`;
        responseData.result     = {
            commentId : commentId
        }

		console.debug ({ reqId, data : responseData, databaseResult }, 'add comment to post success.');

		return responseData;
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { comment, postId, userId } }, 'add comment to post service failed');
        throw "add comment to post service error";
	}
};

posts.findSinglePost = async ({ reqId, postId, userId }) => {
	let responseData = {
        statusCode : '',
        msg        : '',
        result     : { }
    }

	try { 
        
		if (!postId) {
			console.error ( { reqId , data: { postId, userId }}, 'postId is missing.');

            responseData.statusCode = 400;
            responseData.msg        = 'postId missing.';

            return responseData;
		}

        /*
            here using aggregation to find post and comments and all likes are fetched seperately
            we can use one aggregation to find posts and its comment and like using single aggregation query
        */
        let postWithComments = await postsModel.getSinglePost ({
            id : postId,
		});

        let allLikes  = await likeUnlikesModel.getLikesOrDislikes ({ 
            postId  : postId,
            isLiked : true
        })

		responseData.statusCode = 200;
        responseData.msg        = `Single Post fetched.`;
        responseData.result     = {
            ...postWithComments,
            likes : allLikes ? allLikes.length : '',
        }

		console.debug ({ reqId, data : responseData }, 'single post find success.');

		return responseData;
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { postId, userId } }, 'single post find failed');
        throw "single post find service error";
	}
};

posts.findAllPosts = async ({ reqId, userId }) => {
	let responseData = {
        statusCode : '',
        msg        : '',
        result     : { }
    }

	try { 
        
		if (!userId) {
			console.error ( { reqId , data: { userId }}, 'userId is missing.');

            responseData.statusCode = 403;
            responseData.msg        = 'Authentication required';

            return responseData;
		}

        let allPostsWithComments = await postsModel.getAllPosts ({
            userId,
		});

		responseData.statusCode = 200;
        responseData.msg        = `All Posts fetched`;
        responseData.result     = [
            ...allPostsWithComments
        ];

		console.debug ({ reqId, data : responseData }, 'all post find success.');

		return responseData;
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { userId } }, 'all post find service failed');
        throw "all post find service error";
	}
};

module.exports = posts;