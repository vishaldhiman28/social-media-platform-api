const mongoose           = require ('mongoose');
const Emitter            = require ('events').EventEmitter;
const { mongodbConfig }  = require ('config');

const dbURL    = `mongodb://${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.dbName}`;
let connection = mongoose.createConnection (dbURL, { useNewUrlParser: true });
let state      = 'not-connected';
let emitter    = new Emitter ();

connection.on ( 'error', function (err) {
	console.error ({ db : dbURL, err : err }, 'db connection error');
	process.exit (1);
});

connection.on ( 'disconnected', function () {
	state = 'not-connected';
	emitter.emit ('db-disconnected');

	console.error ({ db : dbURL }, 'db disconnected');
});

connection.on ( 'connected', function () {
	state = 'connected';
	emitter.emit ('db-connected');

	console.info ({ db : dbURL }, 'db connected');
});

connection.on ( 'reconnected', function () {
	state = 'connected';
	emitter.emit ('db-connected');

	console.info ({ db : dbURL }, 'db reconnected');
});

function db () {
	if (state != 'connected')
		throw 'not connected';

	return connection;
}

module.exports = {
    db      : db,
    emitter : emitter,
}