import Joi from 'joi';

const theaterValidationRules = {
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Tên rạp không được để trống',
      'string.min': 'Tên rạp phải có ít nhất 3 ký tự',
      'string.max': 'Tên rạp không được vượt quá 100 ký tự',
    }),
  
  location: Joi.string()
    .min(5)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Địa chỉ rạp không được để trống',
      'string.min': 'Địa chỉ rạp phải có ít nhất 5 ký tự',
      'string.max': 'Địa chỉ rạp không được vượt quá 200 ký tự',
    }),

  totalRooms: Joi.number()
    .integer()
    .min(1) 
    .required()
    .messages({
      'number.base': 'Số phòng phải là một số',
      'number.min': 'Số phòng phải ít nhất là 1',
      'number.integer': 'Số phòng phải là số nguyên',
    }),

  openingHours: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])\s*-\s*([01]?[0-9]|2[0-3]):([0-5][0-9])$/)  // Định dạng giờ: "HH:MM - HH:MM"
    .required()
    .messages({
      'string.empty': 'Giờ mở cửa không được để trống',
      'string.pattern.base': 'Giờ mở cửa phải có định dạng "HH:MM - HH:MM"',
    }),
};

export const createTheaterSchema = Joi.object({
  name: theaterValidationRules.name,
  location: theaterValidationRules.location,
  totalRooms: theaterValidationRules.totalRooms,
  openingHours: theaterValidationRules.openingHours,
});

export const updateTheaterSchema = Joi.object({
  name: theaterValidationRules.name.optional(),
  location: theaterValidationRules.location.optional(),
  totalRooms: theaterValidationRules.totalRooms.optional(),
  openingHours: theaterValidationRules.openingHours.optional(),
});
