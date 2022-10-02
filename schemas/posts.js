const mongoose  = require ('mongoose');

const Schema = mongoose.Schema;

let postsSchema = new Schema (
	{
		id        : { type : String, required : true, unique : true },
        userId    : { type : String, required : true },
		title     : { type : String, required : true },
		desc      : { type : String  },
	},
	{
		timestamps : true
	}
);

module.exports = postsSchema;