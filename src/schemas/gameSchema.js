import Joi from "joi";

const gameSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().min(1).required(),
    pricePerDay: Joi.number().required()
});

export default gameSchema;