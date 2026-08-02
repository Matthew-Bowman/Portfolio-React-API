const { Server } = require("socket.io");

const eventBus = require("../events/EventBus");


let io;


const initialise = (server) => {

    io = new Server(server, {
        cors: {
            origin: (origin, callback) => {

                // Allow non-browser clients (curl, mobile apps, etc.)
                if (!origin) {
                    return callback(null, true);
                }


                // Allow any of your subdomains
                if (
                    origin.endsWith(".matthewbowman.uk") ||
                    origin === "https://matthewbowman.uk"
                ) {
                    return callback(null, true);
                }


                callback(new Error("Not allowed by CORS"));

            },

            methods: [
                "GET",
                "POST"
            ]
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