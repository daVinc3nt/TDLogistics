const Orders = require("../database/Orders");

const checkExistOrder = async (order_id) => {
    return Orders.checkExitOrder(order_id);
};

const getAllOrders = async () => {
    return await Orders.getAllOrders();
};

const cancelOrder=async (orderId)=>
{
    await Orders.cancelOrder(orderId);
};

const getTimeOrder = async (orderId)=>
{
    return await Orders.getTime(orderId);
};


const orderMatchUser = async (order_id, user_id)=>{
    return Orders.orderMatchUser(order_id, user_id);
};
module.exports = {
    checkExistOrder,
    getAllOrders,
    getOrder,
    cancelOrder,
    getTimeOrder,
    orderMatchUser
};
