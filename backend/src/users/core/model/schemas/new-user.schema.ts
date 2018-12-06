import * as Joi from 'joi';

export const newUserSchema = Joi.object().keys({
    name: Joi.string().min(3).required().error(new Error('Please include a valid name')),
    email: Joi.string().email().required().error(new Error('Please enter a valid email address')),
    password1: Joi.string().required().error(new Error('Invalid password')),
    password2: Joi.string().required().error(new Error('Please confirm your password'))
});
