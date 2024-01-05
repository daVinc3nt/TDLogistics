const mysql = require("mysql2");
const utils = require("./utils");

const dbOptions = {
    host: process.env.HOST,
    port: process.env.DBPOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
};

const table = "orders";
const sessionTable = "sessions";

const pool = mysql.createPool(dbOptions).promise();

const checkExitOrder = async (order_id) => {
    const result = await utils.findOne(pool, table, ["order_id"], [order_id]);
    return result.length > 0;
};

const getAllOrders = async () => {
    return await utils.find(pool, table);
};

const getOrder = async (fields, values) => {
    return await utils.find(pool, table, fields, values);
};

const cancelOrder=async(values)=>{
      const currentTime=new Date();
      currentTime.setMinutes(currentTime.getMinutes()-30);
      const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');
      const timeCondition = `order_time < = ${formattedTime}`; 

     return await utils.cancelOne(pool, table, ["user_id","order_id","status"], values, timeCondition);
};



module.exports = {
    checkExitOrder,
    getAllOrders,
    getOrder,
    cancelOrder
};
