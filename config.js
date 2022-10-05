/* APP CONFIG */
const app       = { };

app.type        = 'app';
app.name        = 'reunion-api';
app.namePretty  = 'Reunion API';
app.description = 'APIs for a social media platform';

/* SERVER CONFIG */
const server = { };
server.port  = 11395;

/* USER SESSION CONFIG */
const userSession = { };

userSession.secretKey  = '&^%Gbu45t;#efxza12x134sgfs^%$';
userSession.name       = 'renuion.api';

/* MONGODB CONFIG */
const mongodb = { };

mongodb.host   = 'mongo';
mongodb.port   = 27018;
mongodb.dbName = 'reunion';

//not storing in database for now, we can do that later as per requirements
const dummyUserCredentials = {
	email    : 'legionXYZ@gmail.com',
	userId   : 'legion',
	password : '$2y$10$PULolPn5CbvGfmDpHKH8uOTHx1cUS2SAbgnWiyE8OZd2CrrZXH5qm', //hashed password legion$@1290
}

const errorConfig = {
	400 : 'ERR_BAD_REQUEST',
	401 : 'ERR_UNAUHTORISED',
	403 : 'ERR_FORBIDDEN',
	500 : 'ERR_INTERNAL'
}

const tokenConifg = {
	key    : "jfljs90jlkjf90jnklj90s",
	expiry : '1h' // 1 hour expiry
}

module.exports = {
    appConfig            : app,
    userSessConfig       : userSession,
	serverConfig         : server,
	mongodbConfig        : mongodb,
	dummyUserCredentials : dummyUserCredentials,
	errorConfig          : errorConfig,
	tokenConifg          : tokenConifg
};