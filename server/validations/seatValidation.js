import Joi from 'joi';
import mongoose from 'mongoose';

const seatValidationRules = {
  seatNumber: Joi.string()
    .min(2)  
    .max(10)  
    .pattern(/^[A-Za-z0-9]+$/)  
    .required()
    .messages({
      'string.empty': 'Số ghế không được để trống',
      'string.min': 'Số ghế phải chứa ít nhất 2 ký tự',
      'string.max': 'Số ghế không được vượt quá 10 ký tự',
      'string.pattern.base': 'Số ghế chỉ được chứa chữ cái và số',
    }),
  seatType: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('seatType phải là một ObjectId hợp lệ');
      }
      return value;
    })
    .required()
    .messages({
      'string.empty': 'Loại ghế không được để trống',
      'string.pattern.base': 'Loại ghế phải là một ObjectId hợp lệ',
    }),
  status: Joi.string()
    .valid('available', 'booked') 
    .default('available')  
    .required()
    .messages({
      'string.empty': 'Trạng thái không được để trống',
      'any.only': 'Trạng thái phải là "available" hoặc "booked"',
    }),
};

export const createSeatSchema = Joi.object({
  seatNumber: seatValidationRules.seatNumber,
  seatType: seatValidationRules.seatType,
  status: seatValidationRules.status,
});

export const updateSeatSchema = Joi.object({
  seatNumber: seatValidationRules.seatNumber.optional(), 
  seatType: seatValidationRules.seatType.optional(),
  status: seatValidationRules.status.optional(),
});
