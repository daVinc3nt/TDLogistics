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
const cancelOrder=async(phoneNumber)=>{
    const user =await utils.findOne(pool, table, ["phone"], [phoneNumber]);
    const userId=user["user_id"];
    await utils.cancel(pool, orderTable, ["user_id"], [userId]);
};

const checkExistOrder= async(phoneNumber)=>
{
    const user =await utils.findOne(pool, table, ["phone"], [phoneNumber]);
    const userId=user["user_id"];
    const result = await utils.findOne(pool, orderTable, ["user_id"], [userId]);
    return result.length > 0;
}

const getTime=async(phoneNumber)=>
{
    const user =await utils.findOne(pool, table, ["phone"], [phoneNumber]);
    const userId=user["user_id"];
    const order = await utils.findOne(pool, orderTable, ["user_id"], [userId]);
    const orderTime=order["order_time"];
    return new Date(orderTime.replace(' ', 'T'));
}

module.exports = {
    checkExitOrder,
    getAllOrders,
    getOrder,
    cancelOrder,
    getTime,
    checkExistOrder,
};
