import Joi from "joi";

import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);

export const authSchema = Joi.object({
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

const validateAuth = (user: any) => {
  return authSchema.validate(user);
};

export default validateAuth;
