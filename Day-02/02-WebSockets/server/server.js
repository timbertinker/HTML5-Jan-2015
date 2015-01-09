var nodejsWebSocket = require("nodejs-websocket");
var server = nodejsWebSocket.createServer(function(con){
	console.log("A new connection is established");
	con.on("text", function(msg){
		server.connections.forEach(function(c){
			c.sendText(msg);
		});
	});
}).listen(9090);
console.log("Chat server listening on port 9090..");