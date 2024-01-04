const ordersService = require("../services/ordersService");

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


const getAllOrders = async (req, res) => {
    if(!req.isAuthenticated() || req.user.permission < 1) {
        return res.status(401).json({
            error: true,
            message: "Bạn không được truy cập tài nguyên này.",
        });
    }

    try {
        const orders = await ordersService.getAllOrders();
        res.json({
            error: false,
            data: orders,
            message: "Lấy thông tin tất cả đơn hàng thành công!",
        });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            error: true,
            message: "Lỗi hệ thống trong quá trình lấy đơn hàng. Vui lòng thử lại sau.",
        });
    }
}

const getOrder = async (req, res) => {
    if(!req.isAuthenticated() || req.user.permisson < 1) {
        return res.status(401).json({
            error: true,
            message: "Bạn không được phép truy cập tài nguyên này.",
        });
    }

    const keys = new Array();
    const values = new Array();

    for(const key in req.query) {
        if(req.query.hasOwnProperty(key) && req.query[key] !== null && req.query[key] !== undefined && req.query !== "") {
            keys.push(key);
            values.push(req.query[key]);
        }
    }

    if(keys.length < 0) {
        return res.status(400).json({
            error: true,
            message: "Vui lòng không để trống tất cả thông tin!",
        });
    }

    try {
        const result = await ordersService.getOrder(keys, values);

        return res.status(200).json({
            error: false,
            data: result,
            message: "Lấy dữ liệu thành công!",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error,
        });
    }

}
const cancelOrder = async (req, res) => 
{
  const currentTime=new Date();

  if (!req.isAuthenticated() || req.user.permission < 1) {
    return res.status(401).json({
      error: true,
      message: "Vui lòng đăng nhập.",
    });
  }

  if (req.body.order_id === undefined) {
    return res.status(401).json({
      error: true,
      message: "Lỗi truy cập !",
    });
  }

  const userRequestValidation = new utils.CustomerUserRequestValidation(req.body);

  const { error } = userRequestValidation.validateCancelingOrder();
  if (error) {
    return res.status(400).json({
      error: true,
      message: "Thông tin không hợp lệ",
    });
  }


  const values = new Array();
  const checkExistOrder = ordersService.checkExistOrder(req.body.order_id);

  if (!checkExistOrder) {
    return res.status(204).json({
      error: true,
      message: "Đơn hàng không tồn tại.",
    });
  }

  if (req.user.permission === 1) {
    // user
    const matchOrder = ordersService.orderMatchUser(req.body.order_id, req.user.user_id);
    if (!matchOrder) {
      return res.status(401).json({
        error: true,
        message: "Bạn không có quyền truy cập tài nguyên này.",
      });
    }

    const expireTime = utils.checkTimeExpire(currentTime, req.body.order_id);
    if (!expireTime) {
      return res.status(204).json({
        error: true,
        message: `Đơn hàng ${req.body.order_id} không được phép thay đổi`,
      });
    }

    values.push(req.body.order_id);
  } 
  
  else if (req.user.permission === 2)
   {
    // admin
    values.push(req.body.order_id);
  } 
  
  else {
    return res.status(401).json({
      error: true,
      message: "Bạn không có quyền truy cập tài nguyên này.",
    });
  }

  if (values.length < 0) {
    return res.status(400).json({
      error: true,
      message: "Không có đơn hàng được chọn!",
    });
  }

  try {
    await ordersService.cancelOrder(values[0]);
    res.status(200).json({
      error: false,
      message: ` Hủy đơn hàng ${values[0]} thành công . `,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Đã xảy ra lỗi. Vui lòng thử lại.",
    });
  }
};



module.exports = {
    checkExistOrder,
    getAllOrders,
    getOrder,
    cancelOrder,
}
