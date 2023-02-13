import DateExtension from '@joi/date';
import JoiImport from 'joi';
const Joi = JoiImport.extend(DateExtension);

const customerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(10).max(11).pattern(/^[0-9]+$/).required(),
    cpf: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    birthday: Joi.date().max('now')
})

export default customerSchema;