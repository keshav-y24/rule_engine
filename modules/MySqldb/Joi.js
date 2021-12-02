const Joi = require('joi')

const get_source_based_prescriptions = Joi.object().keys({
    source: Joi.string().required(),
    startDate: Joi.string().optional(),
    endDate: Joi.string().optional(),
    orderId : Joi.string().optional()
});

module.exports.get_source_based_prescriptions = get_source_based_prescriptions