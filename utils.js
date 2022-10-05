let utils = { };

utils.generatePostId = () => {
    /*
        We are generating 10 digit random numnber for post id 
        we can also build other logic to generate post id,
    */

    let postId = Math.floor(Math.random() * 9000000000) + 1000000000;
    return postId
}

utils.generateCommentId = ( )=> {
    /*
        We are generating 5 digit random numnber for comment id 
        we can also build other logic to generate comment id,
    */

    let commentId = Math.floor(10000 + Math.random() * 90000);
    return commentId;
}

module.exports = utils;