// validators/bookingValidation.js
import Joi from 'joi';

export const bookingSchema = Joi.object({
    bookingNumber: Joi.string().required().messages({
        'string.base': 'Booking number phải là chuỗi',
        'any.required': 'Booking number là bắt buộc'
    }),
    seatId: Joi.array().items(Joi.string().length(24).required()).required().messages({
        'array.base': 'Seat ID phải là một mảng',
        'any.required': 'Seat ID là bắt buộc',
        'string.length': 'Seat ID phải dài 24 ký tự'
    }),
    totalPrice: Joi.number().positive().required().messages({
        'number.base': 'Total price phải là một số',
        'any.required': 'Total price là bắt buộc',
        'number.positive': 'Total price phải là một số dương'
    }),
    showTimeId: Joi.string().length(24).required().messages({
        'string.base': 'Showtime ID phải là chuỗi',
        'any.required': 'Showtime ID là bắt buộc',
        'string.length': 'Showtime ID phải dài 24 ký tự'
    }),
    status: Joi.string().valid('available', 'booked', 'canceled').default('available').messages({
        'string.base': 'Status phải là chuỗi',
        'any.only': 'Status phải là một trong các giá trị: available, booked, canceled'
    }),
    bookingDate: Joi.date().default(Date.now).messages({
        'date.base': 'Booking date phải là một ngày hợp lệ'
    })
});
