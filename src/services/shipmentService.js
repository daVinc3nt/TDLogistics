const Shipment= require("../database/Shipment")

const shipmentBreak = async (values)=>{
  return await Shipment.breakShipment(values);
}

module.exports={
  shipmentBreak
};
