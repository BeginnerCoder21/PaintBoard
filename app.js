const express = require("express");
const socket = require("socket.io");
const app = express();

app.use(express.static("public"));

let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
    console.log("Listening to port");
});

let io = socket(server);

io.on("connection", (socket) => {
    console.log("Socket connection done");

    //Received data
    socket.on("beginP", (data) => {
        //Transfer data to all connected devices
        io.sockets.emit("beginP", data);
    });
    socket.on("drawStroke", (data) => {
        //Transfer data to all connected devices
        io.sockets.emit("drawStroke", data);
    });
    socket.on("redoUndo", (data) => {
        //Transfer data to all connected devices
        io.sockets.emit("redoUndo", data);
    });
});