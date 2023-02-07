import DateExtension from '@joi/date';
import JoiImport from 'joi';
const Joi = JoiImport.extend(DateExtension);

const customerSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().regex(/^\d{2}-\d{5}-\d{4}$/).required(),
    cpf: Joi.string().required(),
    birthday: Joi.date().format('DD/MM/YYYY').max('now')
})

export default customerSchema;