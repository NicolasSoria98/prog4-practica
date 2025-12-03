const Joi = require('joi')

const createPlayerSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.empty': 'El nombre no puede estar vacío',
            'string.min': 'El nombre debe tener al menos 3 caracteres',
            'string.max': 'El nombre no puede tener más de 50 caracteres',
            'any.required': 'El nombre es obligatorio'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'El email no puede estar vacío',
            'string.email': 'El email debe ser válido',
            'any.required': 'El email es obligatorio'
        }),
    // Campos prohibidos en creación
    id: Joi.forbidden(),
    elo: Joi.forbidden(),
    wins: Joi.forbidden(),
    losses: Joi.forbidden(),
    draws: Joi.forbidden(),
    isActive: Joi.forbidden(),
    registeredAt: Joi.forbidden()
})

const updatePlayerSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    // Campos que no se pueden actualizar
    id: Joi.forbidden(),
    elo: Joi.forbidden(),
    wins: Joi.forbidden(),
    losses: Joi.forbidden(),
    draws: Joi.forbidden(),
    isActive: Joi.forbidden(),
    registeredAt: Joi.forbidden()
}).min(1).messages({
    'object.min': 'Debe enviar al menos un campo para actualizar'
})

module.exports = {
    createPlayerSchema,
    updatePlayerSchema
}