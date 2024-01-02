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
const cancelOrder=async (values)=>
{
    await Users.cancelOrder(values);
};

const getTimeOrder = async (values)=>
{
    return await Users.getTime(values);
};
module.exports = {
    checkExistOrder,
    getAllOrders,
    getOrder,
    cancelOrder,
    getTimeOrder,
};
