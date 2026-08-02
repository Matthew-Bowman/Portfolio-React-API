const { Server } = require("socket.io");

const eventBus = require("../events/EventBus");


let io;


const initialise = (server) => {

    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });


    io.on("connection", socket => {

        console.log(
            "WebSocket client connected:",
            socket.id
        );


        socket.on("disconnect", () => {

            console.log(
                "WebSocket client disconnected:",
                socket.id
            );

        });

    });


    eventBus.subscribe(
        "victron.reading",
        data => {

            io.emit(
                "victron.reading",
                data
            );

        }
    );


};


module.exports = {
    initialise
};