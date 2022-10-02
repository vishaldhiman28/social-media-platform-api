const mongoose  = require ('mongoose');

const Schema = mongoose.Schema;

let commentsSchema = new Schema (
	{   
        commentId : { type : String, required : true, unique : true },
		postId    : { type : String, required : true, unique : true },
		text      : { type : String },
	},
	{
		timestamps : true
	}
);

module.exports = commentsSchema;