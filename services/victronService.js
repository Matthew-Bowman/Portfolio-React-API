const db = require('../db/victronDb');
const eventBus = require('../events/EventBus');


const createVictronReading = async (data) => {


    const query = `
    INSERT INTO VictronReadings
    (
        DeviceType,
        ChargeState,
        ChargerError,
        BatteryVoltage,
        BatteryChargingCurrent,
        YieldToday,
        SolarPower
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
`;

    const values = [
        data.deviceType ?? null,
        data.chargeState ?? null,
        data.chargerError ?? null,
        data.batteryVoltage ?? null,
        data.batteryChargingCurrent ?? null,
        data.yieldToday ?? null,
        data.solarPower ?? null
    ];


    const [rows] =
        await db.execute(
            query,
            values
        );

    // Notify subscribers after successful database insert
    eventBus.publish(
        "victron.reading",
        data
    );


    return rows;

};




const getVictronReadings = async (limit) => {


    const query = `
        SELECT *
        FROM VictronReadings
        ORDER BY Created DESC
        LIMIT ?
    `;


    const [rows] =
        await db.execute(
            query,
            [limit]
        );


    return rows;

};




const getLatestVictronReading = async () => {


    const query = `
        SELECT *
        FROM VictronReadings
        ORDER BY Created DESC
        LIMIT 1
    `;


    const [rows] =
        await db.execute(query);


    return rows[0] || null;

};




module.exports = {
    createVictronReading,
    getVictronReadings,
    getLatestVictronReading
};