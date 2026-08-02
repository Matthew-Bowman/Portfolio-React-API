const { Server } = require("socket.io");

const eventBus = require("../events/EventBus");

const matchesFilter =
    require("../utils/matchesFilter");


let io;


const subscriptions = new Map();




const initialise = (server) => {


    io = new Server(server, {

        cors: {

            origin: (origin, callback) => {

                if (!origin) {
                    return callback(null, true);
                }


                if (
                    origin.endsWith(".matthewbowman.uk") ||
                    origin === "https://matthewbowman.uk"
                ) {

                    return callback(null, true);

                }


                callback(
                    new Error("Not allowed by CORS")
                );

            },


            methods: [
                "GET",
                "POST"
            ]

        }

    });





    io.on(
        "connection",
        socket => {


            console.log(
                "WebSocket client connected:",
                socket.id
            );



            subscriptions.set(
                socket.id,
                []
            );





            socket.on(
                "subscribe",
                subscription => {


                    console.log(
                        "Subscription:",
                        socket.id,
                        subscription
                    );



                    const current =
                        subscriptions.get(socket.id);



                    current.push(
                        subscription
                    );


                }
            );






            socket.on(
                "unsubscribe",
                subscription => {


                    const current =
                        subscriptions.get(socket.id) || [];



                    subscriptions.set(
                        socket.id,
                        current.filter(
                            item =>
                                item.event !== subscription.event
                        )
                    );


                }
            );







            socket.on(
                "disconnect",
                () => {


                    console.log(
                        "WebSocket client disconnected:",
                        socket.id
                    );


                    subscriptions.delete(
                        socket.id
                    );


                }
            );


        }
    );







    eventBus.subscribe(
        "*",
        (event, data) => {

            publish(
                event,
                data
            );

        }
    );



};




const publish = (event, data) => {


    for (
        const [socketId, clientSubscriptions]
        of subscriptions
    ) {



        const client =
            io.sockets.sockets.get(socketId);



        if (!client) {
            continue;
        }






        clientSubscriptions.forEach(
            subscription => {


                if (
                    subscription.event !== event
                ) {
                    return;
                }





                if (
                    !matchesFilter(
                        data,
                        subscription.filters
                    )
                ) {
                    return;
                }





                client.emit(
                    event,
                    data
                );


            }
        );

    }

};





module.exports = {
    initialise,
    publish
};