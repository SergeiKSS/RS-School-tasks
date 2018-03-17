//all command in console

var ws = new WebSocket('ws://188.166.46.38/');
ws.binaryType = 'arraybuffer';
var abc;
ws.onmessage = function(e) {
		abc = e.data;
    console.log(e.data)
}
ws.onopen = function() {
	 ws.send(JSON.stringify({"name":"Siarhei Karpovich", "command": "challenge accepted"}));
}
ws.send(JSON.stringify({"token": "f02480ee2bf53c4d", "command": "arithmetic"}));
ws.send(JSON.stringify({"token": "f02480ee2bf53c4d", "command": "arithmetic", "answer": 51772500}));
ws.send(JSON.stringify({"token": "f02480ee2bf53c4d", "command": "binary_arithmetic"}));
var arr = new Uint8Array(abc);
arr;
ws.send(JSON.stringify({"token": "f02480ee2bf53c4d", "command": "binary_arithmetic", "answer": 2463}));
ws.send(JSON.stringify({"token": "f02480ee2bf53c4d", "command": "win"}));

{"secretCode":"550cde9e737e84ac"}