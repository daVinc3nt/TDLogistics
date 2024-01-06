const shimentService = require("../services/shimentService");
const utils = require("./utils");

const breakShipment = async (req, res) => 
{
  if (!req.isAuthenticated() || req.user.permission < 1) {
    return res.status(401).json({
      error: true,
      message: "Vui lòng đăng nhập.",
    });
  }

  if (req.body.shipment_id === undefined) {
    return res.status(401).json({
      error: true,
      message: "Lỗi truy cập !",
    });
  }

  const userRequestValidation = new utils.CustomerUserRequestValidation(req.body);

  const { error } = userRequestValidation.validateBreakShipment();
  if (error) {
    return res.status(400).json({
      error: true,
      message: "Thông tin không hợp lệ",
    });
  }

  let values;
  if (req.user.permission === 2)
  {
    // admin
     values=req.body.shipment_id;
  } 

  else 
  {
    return res.status(401).json({
      error: true,
      message: "Bạn không có quyền truy cập tài nguyên này.",
    });
  }


  try {
    
  const checkBreakShipment = await shimentService.shipmentBreak(values);
  if (checkBreakShipment.affectedRows > 0)
  {
    res.status(200).json({
      error: false,
      message: ` Phân rã đơn hàng ${req.body.shipment_id} thành công. `,
    });
  }

  else
    {
      res.status(200).json({
        error: true,
        message: ` Phân rã đơn hàng ${req.body.shipment_id} thất bại. Vui lòng kiểm tra lại! `,
      });
    }

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Đã xảy ra lỗi. Vui lòng thử lại.",
    });
  }
};

module.exports={
  breakShipment
}
