import Joi from 'joi'

export default {
    login: Joi.object().keys({
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            username: Joi.string(),
            password: Joi.string().required(),
        })
            .xor("username", 'email')
    })
};
