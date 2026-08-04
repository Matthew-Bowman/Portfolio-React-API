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
    SolarPower,
    OutputVoltage1,
    OutputCurrent1,
    OutputVoltage2,
    OutputCurrent2,
    OutputVoltage3,
    OutputCurrent3,
    Temperature,
    AcCurrent
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    const values = [
        data.deviceType ?? null,

        data.chargeState ?? null,

        data.chargerError ?? null,

        data.batteryVoltage ?? null,

        data.batteryChargingCurrent ?? data.current ?? null,

        data.yieldToday ?? null,

        data.solarPower ?? null,

        data.outputVoltage1 ?? null,

        data.outputCurrent1 ?? null,

        data.outputVoltage2 ?? null,

        data.outputCurrent2 ?? null,

        data.outputVoltage3 ?? null,

        data.outputCurrent3 ?? null,

        data.temperature ?? null,

        data.acCurrent ?? null
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