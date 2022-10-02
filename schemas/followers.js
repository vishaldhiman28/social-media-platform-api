const mongoose  = require ('mongoose');

const Schema = mongoose.Schema;

let followersSchema = new Schema (
	{
		userId     : { type : String, required : true },
		followeeId : { type : String, required : true }
	},
	{
		timestamps : true
	}
);

followersSchema.index({ "userId": 1, "followeeId": 1}, { "unique": true });

module.exports = followersSchema;