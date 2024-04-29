const Joi = require('joi');


module.exports.userSignUpSchema = (payload) => {
    const patientSignUpSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),

    }).unknown(false);

    const validation = patientSignUpSchema.validate(payload);
    return validation;
}

module.exports.userDetailSchema = (payload) => {
    const userDetailSchema = Joi.object({
        phone: Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        username :  Joi.string(),
        Description : Joi.string(),
        
    }).unknown(false);

    const validation = userDetailSchema.validate(payload);
    return validation;
};


