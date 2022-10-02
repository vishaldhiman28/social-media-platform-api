const mongoose  = require ('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema (
	{
		userId    : { type : String, required : true, unique : true },
		firstName : { type : String  },
		lastName  : { type : String  }, 
	},
	{
		timestamps : true
	}
);

module.exports = userSchema;