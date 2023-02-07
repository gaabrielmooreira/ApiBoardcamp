const validatorSchema = schema => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {abortEarly: false});
        if (error) {
            const errorMessages = error.details.map( error => error.message );
            return res.status(422).send(errorMessages);
        }
        next();
    }
}

export default validatorSchema;