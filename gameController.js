const { getSuperheroes } = require('./gameService');

async function getHeroes(req, res) {
    try {
        const superheroes = await getSuperheroes();
        if (superheroes && superheroes.length > 0) {
            res.json(superheroes);
        } else {
            res.status(500).json({ error: 'No se pudieron encontrar superhéroes.' });
        }
    } catch (error) {
        console.error('Error al obtener superhéroes:', error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getHeroes };
