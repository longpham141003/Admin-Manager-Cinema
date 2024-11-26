import Joi from 'joi';

const seatTypeValidationRules = {
  name: Joi.string()
    .min(3)  
    .max(50)  
    .required()
    .messages({
      'string.empty': 'Tên loại ghế không được để trống',
      'string.min': 'Tên loại ghế phải chứa ít nhất 3 ký tự',
      'string.max': 'Tên loại ghế không được vượt quá 50 ký tự',
    }),
  price: Joi.number()
    .greater(0) 
    .required()
    .messages({
      'number.base': 'Giá phải là một số',
      'number.greater': 'Giá phải lớn hơn 0',
      'number.empty': 'Giá không được để trống',
    }),
};

export const createSeatTypeSchema = Joi.object({
  name: seatTypeValidationRules.name,
  price: seatTypeValidationRules.price,
});

export const updateSeatTypeSchema = Joi.object({
  name: seatTypeValidationRules.name.optional(),
  price: seatTypeValidationRules.price.optional(),
});
