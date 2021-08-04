import Joi from 'joi'

export default {
    create: Joi.object().keys({
        body: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            body: Joi.string().required(),
        }).required()
    }),
    load: Joi.object().keys({
        params: Joi.object().keys({
            id: Joi.string().regex(/^[0-9a-f]{24}$/).required()
        }).required()
    }),
    update: Joi.object().keys({
        params: Joi.object().keys({
            id: Joi.string().regex(/^[0-9a-f]{24}$/).required()
        }).required(),
        body: Joi.object().keys({
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            body: Joi.string().optional(),
        })
    }),
    remove: Joi.object().keys({
        params: Joi.object().keys({
            id: Joi.string().regex(/^[0-9a-f]{24}$/).required()
        }).required()
    }),
};
