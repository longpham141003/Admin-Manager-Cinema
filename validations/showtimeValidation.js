import Joi from 'joi';

const showtimeValidationRules = {
    movieId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            'string.empty': 'Movie ID không được để trống',
            'string.pattern.base': 'Movie ID phải có định dạng hợp lệ',
        }),

    theaterId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            'string.empty': 'Theater ID không được để trống',
            'string.pattern.base': 'Theater ID phải có định dạng hợp lệ',
        }),

    showtime: Joi.date()
        .required()
        .messages({
            'date.base': 'Thời gian chiếu phải là một ngày hợp lệ',
            'any.required': 'Thời gian chiếu là bắt buộc',
        }),

    room: Joi.string()
        .min(1)
        .required()
        .messages({
            'string.empty': 'Tên phòng không được để trống',
            'string.min': 'Tên phòng phải có ít nhất 1 ký tự',
        }),
};

export const createShowtimeSchema = Joi.object({
    movieId: showtimeValidationRules.movieId,
    theaterId: showtimeValidationRules.theaterId,
    showtime: showtimeValidationRules.showtime,
    room: showtimeValidationRules.room,
});

export const updateShowtimeSchema = Joi.object({
    movieId: showtimeValidationRules.movieId,
    theaterId: showtimeValidationRules.theaterId,
    showtime: showtimeValidationRules.showtime,
    room: showtimeValidationRules.room,
});
