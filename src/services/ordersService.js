const Orders = require("../database/Orders");

const checkExistOrder = async (order_id) => {
    return Orders.checkExitOrder(order_id);
};

const getAllOrders = async () => {
    return await Orders.getAllOrders();
};

const getOrder = async (fields, values) => {
    return await Orders.getOrder(fields, values);
};
const cancelOrder=async (phoneNumber)=>
{
    await Users.cancelOrder(phoneNumber);
};

const getTime = async (phoneNumber)=>
{
    return await Users.getTime(phoneNumber);
};

const checkExistOrder= async(phoneNumber)=>
{
    return await Users.checkExistOrder(phoneNumber);
};
module.exports = {
    checkExistOrder,
    getAllOrders,
    getOrder,
    cancelOrder,
    getTime,
    checkExistOrder,
};
