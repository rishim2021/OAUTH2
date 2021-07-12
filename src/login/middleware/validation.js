const Joi = require('joi');

function validateFields(bodyData){
    const schema = Joi.object({
        UserPassword : Joi.string().min(5).required(),
        UserEmail : Joi.string().email({ tlds: { allow: false } }).required(),

    })
    return schema.validate(bodyData,{allowUnknown:true})
}




exports.validate = validateFields;
