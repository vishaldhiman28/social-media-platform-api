const mongoose  = require ('mongoose');

const Schema = mongoose.Schema;

let likesUnlikesSchema = new Schema (
	{
		postId     : { type : String,  required : true },
		userId     : { type : String,  required : true },
		isLiked    : { type : Boolean, require : true } 
	},
	{
		timestamps : true
	}
);

module.exports = likesUnlikesSchema;