const mongoose  = require ('mongoose');

const Schema = mongoose.Schema;

let likesUnlikesSchema = new Schema (
	{
		postId     : { type : String,  required : true },
		userId     : { type : String,  required : true },
		isLiked    : { type : Boolean, required : true } 
	},
	{
		timestamps : true
	}
);

likesUnlikesSchema.index({ "userId": 1, "postId": 1}, { "unique": true });

module.exports = likesUnlikesSchema;