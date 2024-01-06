const mysql = require("mysql2");
const utils = require("./utils");

const dbOptions = {
    host: process.env.HOST,
    port: process.env.DBPORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
};
const pool = mysql.createPool(dbOptions).promise();

const table="shipment";
 // 15 là đóng lô
// 78 là rã lô
const breakShipment = async(shipment_id)=>{
  return await utils.update(pool, table, ["status"], [78], ["status","shipment_id"], [15, shipment_id]);
 
};
 
 module.exports={
  breakShipment,
 }
