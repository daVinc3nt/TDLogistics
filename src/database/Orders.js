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
const orderTable="orders";

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

const cancelOrder=async(values, permission)=>{
  if (permission===1)
  {
      const currentTime=new Date();
      currentTime.setMinutes(currentTime.getMinutes()-30);
      const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');

     return await utils.cancelOne(pool, orderTable, ["user_id","order_id"], values, formattedTime);
  }
  else
  {
     return await utils.cancelOne(pool, orderTable, ["order_id"], values);
  }
};


const getTimeOrder=async(orderId)=>
{
  const order =await utils.findOne(pool, orderTable, ["order_id"], [orderId]);
  const orderTime=order["order_time"];
  return new Date(orderTime.replace(' ', 'T'));
}

const orderMatchUser= async (order_id, user_id) =>
{
  const result = await utils.find(pool, table, ["order_id","user_id"], [order_id , user_id]);
  return result.length > 0;
}


module.exports = {
    checkExitOrder,
    getAllOrders,
    getOrder,
    cancelOrder,
    getTimeOrder,
    orderMatchUser,
};
