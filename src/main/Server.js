import * as Http from "http";
//import * as SocketsIO from "sockets.io";

const onRequest = (request, response) => {
	
};

const create = () => {
	return {
		httpServer: Http.createServer(onRequest),
		sockets: []
	};
};

const startListening = (server, port) => {
	server.httpServer.listen(port);
}

const destroy = (server) => {
	
};

const registerSocket = (server, socket) => {
	server.sockects.push(socket);
};

const unregisterSocket = (server, socket) => {
	server.sockects.remove(sockect);
};

export default {
	create,
	startListening,
	destroy,
	registerSocket,
	unregisterSocket
};