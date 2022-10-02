class ErrorSerialize extends Error {
	constructor (errorName, statusCode, msg) {
		super ();
        this.errorName  = errorName;
		this.statusCode = statusCode;
		this.message    = msg;
	}

	serialize () {
		return {
            name       : this.errorName,
			statusCode : this.statusCode,
            msg        : this.message
		};
	}
}

module.exports = ErrorSerialize;