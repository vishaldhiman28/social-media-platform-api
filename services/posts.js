const moment     = require ('moment');
const postsModel = require ('models/posts'); 
const posts      = { };

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

        /*
            We are generating 10 digit unique numnber for post id 
            we can also build other logic to generate post id,
        */

        let postId = Math.floor(1000 + Math.random() * 9000);
		
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
		console.debug ({ reqId, data : responseData}, 'post create success.');

		return responseData;
	}
	catch (err) {
		console.error ( { reqId, err : err.stack,  data : { title, desc, userId } }, 'post create failed');
        throw "post create service error";
	}
};

module.exports = posts;