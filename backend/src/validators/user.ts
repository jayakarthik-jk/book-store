import Joi from "joi";

import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);

export const userSchema = Joi.object({
  name: Joi.string().min(1).max(255).required().label("Name"),
  email: Joi.string().email().required().label("Email"),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .min(8)
    .max(255)
    .label("Password")
    .required(),
});

const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

export const validateId = (id: string) => {
  return objectId.validate(id);
};

const validateUser = (user: any) => {
  return userSchema.validate(user);
};

export default validateUser;
