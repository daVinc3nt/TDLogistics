const ordersService = require("../services/ordersService");
const utils = require("./utils");

const checkExistOrder = async (req, res) => {
    try {
        const existed = await ordersService.checkExistOrder(req.body.order_id);
        return res.status(200).json({
            error: false, 
            existed: existed,
            message: existed ? "Đơn hàng đã tồn tại." : "Đơn hàng không tồn tại.",
        }); 
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: error,
        });
    }
}

// const getAllOrders = async (req, res) => {
//     if(!req.isAuthenticated() || req.user.permission < 1) {
//         return res.status(401).json({
//             error: true,
//             message: "Bạn không được truy cập tài nguyên này.",
//         });
//     }

//     try {
//         const orders = await ordersService.getAllOrders();
//         res.json({
//             error: false,
//             data: orders,
//             message: "Lấy thông tin tất cả đơn hàng thành công!",
//         });
//     } catch (error) {
//         console.log("Error: ", error);
//         res.status(500).json({
//             error: true,
//             message: "Lỗi hệ thống trong quá trình lấy đơn hàng. Vui lòng thử lại sau.",
//         });
//     }
// }

const getOrder = async (req, res) => {
    //const permission = req.user.permission;
    const permission = 2;
    // if(!req.isAuthenticated() || permission < 1) {
    //     return res.status(401).json({
    //         error: true,
    //         message: "Bạn không được phép truy cập tài nguyên này.",
    //     });
    // }


    if(permission === 2) {
        const ordersRequestValidation = new utils.CustomerUserRequestValidation(req.body);
        const { error } = ordersRequestValidation.validateFindingOrderForAdmin();
        if(error) {
            return res.status(400).json({
                error: true,
                message: "Thông tin không hợp lệ!",
            });
        }

        const keys = new Array();
        const values = new Array();

        for (const key in req.body) {
            keys.push(key);
            values.push(req.body[key]);
        }

        if(keys.length === 0) {
            try {
                const orders = await ordersService.getAllOrders();
                return res.status(200).json({
                    error: false,
                    data: orders,
                    message: "Lấy thông tin tất cả đơn hàng thành công!",
                });  
            } catch (error) {
                console.log("Error: ", error);
                return res.status(500).json({
                    error: true,
                    message: "Lỗi hệ thống trong quá trình lấy đơn hàng. Vui lòng thử lại sau.",
                });
            }
        }
        else {
            try {
                const orders = await ordersService.getOrder(keys, values);
                return res.status(200).json({
                    error: false,
                    data: orders,
                    message: "Lấy thông tin tất cả đơn hàng thành công!",
                });
                
            } catch (error) {
                return res.status(500).json({
                    error: true,
                    message: error,
                });
            }
        }
    }
    
    else {
        const ordersRequestValidation = new utils.CustomerUserRequestValidation(req.body);
        const { error } = ordersRequestValidation.validateFindingOrder();
        if(error) {
            return res.status(400).json({
                error: true,
                message: "Thông tin không hợp lệ!",
            });
        }

        const keys = new Array();
        const values = new Array();

        for (const key in req.body) {
            keys.push(key);
            values.push(req.body[key]);
        }

        try {
            const orders = await ordersService.getOrder(keys, values);
            return res.status(200).json({
                error: false,
                data: orders,
                message: "Lấy thông tin tất cả đơn hàng thành công!",
            }); 
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error,
            });
        }
    }
    

}

const createNewOrder = async (req, res) => {
    if(!req.isAuthenticated() || req.user.permisson < 1) {
        return res.status(401).json({
            error: true,
            message: "Bạn không được phép truy cập tài nguyên này.",
        });
    }
    const userRequestValidation = new utils.CustomerUserRequestValidation(req.body);

    const { error } = userRequestValidation.validateCreatingOrder();

    if (error) {
        return res.status(400).json({
            error: true,
            message: "Thông tin không hợp lệ!",
        });
    }

    const keys = new Array();
    const values = new Array();

    for (const key in req.body) {
        keys.push(key);
        values.push(req.body[key]);
    }

    keys.push("user_id");
    keys.push("fee");
    keys.push("COD");
    values.push("00000009");
    values.push(23000);
    values.push(124000);

    try {
        const result = await ordersService.createNewOrder(keys, values);
        
        console.log(result);
        return res.status(200).json({
            error: false,
            message: "Tạo đơn hàng thành công.",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error,
        });
    }
}


module.exports = {
    checkExistOrder,
    getOrder,
    createNewOrder,
}
