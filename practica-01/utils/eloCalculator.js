/**
 * Calcula la puntuación esperada de un jugador contra otro
 * @param {number} eloA - ELO del jugador A
 * @param {number} eloB - ELO del jugador B (oponente)
 * @returns {number} Probabilidad de que A gane (0-1)
 */
function getExpectedScore(eloA, eloB) {
    const exponent = (eloB - eloA) / 400
    const power = Math.pow(10, exponent)
    const expected = 1 / (1 + power)
    return expected
}

/**
 * Determina el K-factor según el nivel de ELO
 * @param {number} elo - ELO actual del jugador
 * @returns {number} K-factor (20, 30 o 40)
 */
function getKFactor(elo) {
    if (elo < 1400) {
        return 40
    }
    if (elo >= 1400 && elo < 2000) {
        return 30
    }
    return 20
}

/**
 * Calcula el nuevo ELO después de una partida
 * @param {number} currentElo - ELO actual del jugador
 * @param {number} opponentElo - ELO del oponente
 * @param {number} result - Resultado: 1 (victoria), 0.5 (empate), 0 (derrota)
 * @returns {number} Nuevo ELO (redondeado)
 */
function calculateNewElo(currentElo, opponentElo, result) {
    const expected = getExpectedScore(currentElo, opponentElo)
    const kFactor = getKFactor(currentElo)
    const change = kFactor * (result - expected)
    const newElo = currentElo + change
    return Math.round(newElo)
}

module.exports = {
    calculateNewElo
}