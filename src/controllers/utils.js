const crypto = require("crypto");

const hashPhoneNumber = async (phoneNumber) => {
    const hash = crypto.createHash("sha256");
    hash.update(phoneNumber);
    return hash.digest("hex");
}
const checkTimeExpire = (currentTime,orderId)=>
{
      const orderTime = ordersService.getTimeOrder(orderId);
      const differenceTime = currentTime - orderTime;
      const limitTime = Math.floor((differenceTime / 60) * 1000);
      return limitTime <= 30;
}


class CustomerUserRequestValidation {
      constructor(data) {
          this._data = data;
      }
  
      validateCreatingOrder = () => {
          const schema = Joi.object({
              order_id: Joi.string().alphanum().min(5).max(15).required(),
              mass: Joi.number().precision(2).min(0).required(),
              height: Joi.number().precision(2).min(0).required(),
              width: Joi.number().precision(2).min(0).required(),
              length: Joi.number().precision(2).min(0).required(),
              long_source: Joi.number().min(-180).max(180).required(),
              lat_source: Joi.number().min(-90).max(90).required(),
              long_destination: Joi.number().min(-180).max(180).required(),
              lat_destination: Joi.number().min(-90).max(90).required(),
              parent: Joi.string().alphanum().min(6).max(6),
              container: Joi.string().alphanum().min(6).max(6),
              journey: Joi.string().alphanum(),
              COD: Joi.number().precision(3).min(0),
              status_success: Joi.boolean(),
              miss: Joi.number().min(0).max(3),
          });
          
          return schema.validate(this._data);
      }
      
      validateFindingOrder = () => {
          const schema = Joi.object({
              order_id: Joi.string().alphanum().min(5).max(15).required(),
              start_order_time: Joi.date(),
              end_order_time: Joi.date(),
              start_mass: Joi.number().precision(2).min(0),
              end_mass: Joi.number().precision(2).min(0),
              start_height: Joi.number().precision(2).min(0),
              end_height: Joi.number().precision(2).min(0),
              start_width: Joi.number().precision(2).min(0),
              end_width: Joi.number().precision(2).min(0),
              start_length: Joi.number().precision(2).min(0),
              end_length: Joi.number().precision(2).min(0),
              province_source_code: Joi.number().min(0).max(63),
              province_destination_code: Joi.number().min(0).max(63),
              district_source_code: Joi.number().min(0),
              district_destination_code: Joi.number().min(0),
              town_source_code: Joi.number().min(0),
              town_destination_code: Joi.number().min(0),
              status_success: Joi.boolean(),
              miss: Joi.number().min(0).max(3),
          });
          
          return schema.validate(this._data);
      }
      
      validateUpdatingOrder = () => {
          const schema = Joi.object({
              order_id: Joi.string().alphanum().min(5).max(15).required(),
              order_time: Joi.date(),
              mass: Joi.number().precision(2).min(0),
              height: Joi.number().precision(2).min(0),
              width: Joi.number().precision(2).min(0),
              length: Joi.number().precision(2).min(0),
              long_source: Joi.number().min(-180).max(180),
              lat_source: Joi.number().min(-90).max(90),
              long_destination: Joi.number().min(-180).max(180),
              lat_destination: Joi.number().min(-90).max(90),
              COD: Joi.number().precision(3).min(0),
          });
      
          return schema.validate(this._data);
      }
      
      validateCancelingOrder = () => {
          const schema = Joi.object({
              order_id: Joi.string().alphanum().min(5).max(15).required()
          });
      
          return schema.validate(this._data);
      }
  }
  

module.exports = {
    hashPhoneNumber,
    CustomerUserRequestValidation,
    checkTimeExpire
}
