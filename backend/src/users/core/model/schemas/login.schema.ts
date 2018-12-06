import * as Joi from 'joi';

export const loginSchema = Joi.object().keys({
    email: Joi.string().email().required().error(new Error('Invalid email')),
    password: Joi.string().required().error(new Error('Please enter a password'))
});
