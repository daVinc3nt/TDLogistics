const Orders = require("../database/Orders");

const checkExistOrder = async (order_id) => {
    return Orders.checkExitOrder(order_id);
};

const getAllOrders = async () => {
    return await Orders.getAllOrders();
};

const cancelOrder=async (values, permission)=>
{
    await Orders.cancelOrder(values, permission);
};





module.exports = {
    checkExistOrder,
    getAllOrders,
    getOrder,
    cancelOrder
};
