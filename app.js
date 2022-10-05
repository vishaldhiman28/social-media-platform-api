require ('app-module-path').addPath (__dirname + '/');

const cookieParser      = require ('cookie-parser');
const useragent         = require ('express-useragent');
const minimist          = require ('minimist');
const express           = require ('express');
const bodyParser        = require ('body-parser');
const {
	appConfig,
	serverConfig
}                       = require ('config');

const args = minimist (process.argv.slice (2));

const routes = require ('routes');
const server = express ();

/* Initializing middlewares */
server.use ((req, res, next) => {
        res.header ('Access-Control-Allow-Origin', '*');
        next ();
});

server.use (useragent.express ());
server.use (cookieParser ());
server.use (bodyParser.json ());
server.use (express.json ({ limit : '2mb' }) );
server.use (express.urlencoded ({
    limit          : '2mb',
    parameterLimit : 100000,
    extended       : true
}) );

const initApp = async () => {
    try {
        console.info ("starting app....");

        console.log ('\t\t*--- Reunion API ---*');
        console.log ();
        console.log ('\t\t  NAME          : ' + appConfig.name);
        console.log ('\t\t  DESCRIPTION   : ' + appConfig.description);
        console.log ('\t\t  PORT          : ' + serverConfig.port );
        console.log ();
        console.log ('\t\t*-------------------*');

		/* routes initialization*/
		await routes.init (server);

        /* server port */
        server.listen (serverConfig.port);

        console.info ({ port : serverConfig.port }, 'server running....');
    }
    catch (err) {
        console.error ({ err : err.stack }, 'server failed');
        process.exit (1);
    }
};

initApp ();