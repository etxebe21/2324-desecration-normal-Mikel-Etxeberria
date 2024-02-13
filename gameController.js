const { getSuperheroes } = require('./gameService');

let heroesObject = {}; 

async function getHeroes(req, res) {
    try {
        const superheroes = await getSuperheroes();
        if (!superheroes || superheroes.length === 0) {
            return res.status(500).json({ error: 'No se pudieron encontrar superhéroes.' });
        }
        
        superheroes.forEach(hero => {
            heroesObject[hero.name] = hero;
        });

        //console.log('HEROES', heroesObject); 
       
    } catch (error) {
        console.error('Error al obtener superhéroes:', error.message);
        return res.status(500).json({ error: error.message });
    }
}

async function createNewHeroes() {
    try {
        await getHeroes(); 
        
        // Buscar el héroe con nombre "JunkPile"
        const junkPileHero = heroesObject['Junkpile'];
        
        // Crear un nuevo objeto con el héroe encontrado
        const junkpileHeroObject = {
            JunkPile: junkPileHero
        };
        
        console.log('Nuevo héroe:', junkpileHeroObject);
        
        // Obtener un héroe aleatorio del objeto heroesObject
        const randomHeroIndex = Math.floor(Math.random() * Object.keys(heroesObject).length);
        const randomHeroName = Object.keys(heroesObject)[randomHeroIndex];
        const randomHero = heroesObject[randomHeroName];
        
        // Crear un nuevo objeto con el héroe aleatorio
        const randomHeroObject = {
            RandomHero: randomHero
        };
        
        console.log('Héroe aleatorio:', randomHeroObject);
    } catch (error) {
        console.error('Error al inicializar:', error.message);
    }
}

createNewHeroes();

module.exports = { getHeroes };
