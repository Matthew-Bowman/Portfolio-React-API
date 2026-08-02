class EventBus {

    constructor() {
        this.listeners = {};
    }


    subscribe(event, callback) {

        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);

    }


    publish(event, data) {

        const callbacks = [

            ...(this.listeners[event] || []),

            ...(this.listeners["*"] || [])

        ];


        callbacks.forEach(callback => {

            callback(event, data);

        });

    }

}


module.exports = new EventBus();