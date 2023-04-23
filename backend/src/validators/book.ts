import Joi from "joi";

export const bookSchema = Joi.object({
  title: Joi.string().min(1).max(255).required().label("Title"),
  author: Joi.string().min(1).max(255).required().label("Author"),
});

const validateBook = (user: any) => {
  return bookSchema.validate(user);
};

export default validateBook;
