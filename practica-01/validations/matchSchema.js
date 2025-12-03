const Joi = require('joi')

const createMatchSchema = Joi.object({
    whitePlayerId: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'El ID del jugador con piezas blancas debe ser un número',
            'number.integer': 'El ID del jugador con piezas blancas debe ser un entero',
            'any.required': 'El ID del jugador con piezas blancas es obligatorio'
        }),
    blackPlayerId: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'El ID del jugador con piezas negras debe ser un número',
            'number.integer': 'El ID del jugador con piezas negras debe ser un entero',
            'any.required': 'El ID del jugador con piezas negras es obligatorio'
        }),
    result: Joi.string()
        .valid('white', 'black', 'draw')
        .required()
        .messages({
            'any.only': 'El resultado debe ser: white, black o draw',
            'any.required': 'El resultado es obligatorio'
        }),
    moves: Joi.number()
        .integer()
        .min(10)
        .max(200)
        .required()
        .messages({
            'number.base': 'Los movimientos deben ser un número',
            'number.integer': 'Los movimientos deben ser un entero',
            'number.min': 'Los movimientos deben ser al menos 10',
            'number.max': 'Los movimientos no pueden superar 200',
            'any.required': 'Los movimientos son obligatorios'
        }),
    duration: Joi.number()
        .integer()
        .min(5)
        .max(300)
        .required()
        .messages({
            'number.base': 'La duración debe ser un número',
            'number.integer': 'La duración debe ser un entero',
            'number.min': 'La duración debe ser al menos 5 minutos',
            'number.max': 'La duración no puede superar 300 minutos',
            'any.required': 'La duración es obligatoria'
        }),
    tournamentId: Joi.number()
        .integer()
        .optional()
        .allow(null)
        .messages({
            'number.base': 'El ID del torneo debe ser un número',
            'number.integer': 'El ID del torneo debe ser un entero'
        }),
    // Campos prohibidos
    id: Joi.forbidden(),
    playedAt: Joi.forbidden()
})

module.exports = {
    createMatchSchema
}