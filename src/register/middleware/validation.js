const Joi = require('joi');

function validateFields(bodyData){
    const schema = Joi.object({
        UserName : Joi.string().required(),
        UserPassword : Joi.string().min(5).required(),
        UserEmail : Joi.string().email({ tlds: { allow: false } }).required(),
        UserPhone : Joi.string().min(10).max(10).required()

    })
    return schema.validate(bodyData,{allowUnknown:true})
}




exports.validate = validateFields;
