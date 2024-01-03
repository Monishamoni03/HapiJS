import Joi from "joi";

export const userValidationSchema = (input: Object) => {
  const userSchema = Joi.object({
    userName: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    aceNo: Joi.string().optional(),
  });

  return userSchema.validate(input);
};
