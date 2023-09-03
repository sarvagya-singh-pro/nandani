import { Server } from "socket.io";

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        console.log("*First use, starting socket.io");
        const io = new Server(res.socket.server,{path:'/api/socket',});
        console.log(io.connection)
        io.on("connection", (socket) => {
            console.log("Connected socket.io");
            socket.broadcast.emit("a user connected");
            socket.on("hello", (msg) => {
                socket.emit("hello", "world!");
            });
        });

        res.socket.server.io = io;
    } else {
        res.send(`${res.socket.server.io["connected"]}`)
        console.log("socket.io already running");
    }
    res.end();
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default ioHandler;