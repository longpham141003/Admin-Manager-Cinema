import Joi from 'joi';

const movieValidationRules = {
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Tiêu đề không được để trống',
      'string.min': 'Tiêu đề phải có ít nhất 3 ký tự',
      'string.max': 'Tiêu đề tối đa 100 ký tự',
    }),
  description: Joi.string()
    .max(1000)
    .optional()
    .messages({
      'string.max': 'Mô tả tối đa 1000 ký tự',
    }),
  actors: Joi.array()
    .items(Joi.string().min(2).max(50))
    .optional()
    .messages({
      'array.base': 'Diễn viên phải là một mảng các chuỗi',
      'string.min': 'Tên diễn viên phải có ít nhất 2 ký tự',
      'string.max': 'Tên diễn viên tối đa 50 ký tự',
    }),
  director: Joi.string()
    .max(100)
    .optional()
    .messages({
      'string.max': 'Tên đạo diễn tối đa 100 ký tự',
    }),
  trailer: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'URL trailer phải là một URL hợp lệ',
    }),
  releaseDate: Joi.date()
    .required()
    .greater('now')  
    .messages({
      'date.base': 'Ngày phát hành phải là một ngày hợp lệ',
      'date.greater': 'Ngày phát hành phải sau ngày hôm nay',
    }),
  duration: Joi.number()
    .min(1)  // tg phim min
    .required()
    .messages({
      'number.base': 'Thời gian chiếu phải là một số',
      'number.min': 'Thời gian chiếu phải lớn hơn 0 phút',
    }),
  genre: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Thể loại không được để trống',
      'string.min': 'Thể loại phải có ít nhất 3 ký tự',
      'string.max': 'Thể loại tối đa 50 ký tự',
    }),
  poster: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'URL poster phải là một URL hợp lệ',
    }),
  image: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'URL hình ảnh phải là một URL hợp lệ',
    }),
  showtimes: Joi.array()
    .items(Joi.string().pattern(/^([0-9]{2}):([0-9]{2})$/))  
    .optional()
    .messages({
      'array.base': 'Lịch chiếu phải là một mảng các chuỗi',
      'string.pattern.base': 'Lịch chiếu phải theo định dạng giờ:phút, ví dụ: 14:30',
    }),
  status: Joi.string()
    .valid('Đang chiếu', 'Sắp chiếu')
    .required()
    .messages({
      'any.only': 'Trạng thái phải là "Đang chiếu" hoặc "Sắp chiếu"',
      'string.empty': 'Trạng thái không được để trống',
    }),
};

export const addMovieSchema = Joi.object({
  title: movieValidationRules.title,
  description: movieValidationRules.description,
  actors: movieValidationRules.actors,
  director: movieValidationRules.director,
  trailer: movieValidationRules.trailer,
  releaseDate: movieValidationRules.releaseDate,
  duration: movieValidationRules.duration,
  genre: movieValidationRules.genre,
  poster: movieValidationRules.poster,
  image: movieValidationRules.image,
  showtimes: movieValidationRules.showtimes,
  status: movieValidationRules.status,
});

export const updateMovieSchema = Joi.object({
  title: movieValidationRules.title.optional(),
  description: movieValidationRules.description.optional(),
  actors: movieValidationRules.actors.optional(),
  director: movieValidationRules.director.optional(),
  trailer: movieValidationRules.trailer.optional(),
  releaseDate: movieValidationRules.releaseDate.optional(),
  duration: movieValidationRules.duration.optional(),
  genre: movieValidationRules.genre.optional(),
  poster: movieValidationRules.poster.optional(),
  image: movieValidationRules.image.optional(),
  showtimes: movieValidationRules.showtimes.optional(),
  status: movieValidationRules.status.optional(),
});
