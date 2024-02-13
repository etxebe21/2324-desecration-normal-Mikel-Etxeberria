const { getSuperheroes } = require('./gameService');

let heroesObject = {}; 
let junkpileHeroObject;
let randomHeroObject;

async function getHeroes(req, res) {
    try {
        const superheroes = await getSuperheroes();
        if (!superheroes || superheroes.length === 0) {
            return res.status(500).json({ error: 'No se pudieron encontrar superhéroes.' });
        }
        
        superheroes.forEach(hero => {
            heroesObject[hero.name] = hero;
        });

        console.log('HEROES', heroesObject)

        // Una vez que se han obtenido los datos, llamar a createNewHeroes
        await createNewHeroes();

    } catch (error) {
        console.error('Error al obtener superhéroes:', error.message);
        return res.status(500).json({ error: error.message });
    }
}

//Funcion para crear los dos jugadores
async function createNewHeroes() {
    try {
        // Buscar el héroe con nombre "JunkPile"
        const junkPileHero = heroesObject['Junkpile'];
        
        // Crear un nuevo objeto con el héroe encontrado
        junkpileHeroObject = {
            JunkPile: junkPileHero
        };

          // Añadir el nuevo atributo hitPoints al héroe JunkPile
          junkPileHero.powerstats.hitPoints = junkPileHero.powerstats.strength * 10;
          junkPileHero.powerstats.hitPoints = junkPileHero.powerstats.hitPoints > 666 ? 666 : junkPileHero.powerstats.hitPoints;
        
        console.log('Nuevo héroe:', junkpileHeroObject);
        
        // Obtener un héroe aleatorio del objeto heroesObject
        const randomHeroIndex = Math.floor(Math.random() * Object.keys(heroesObject).length);
        const randomHeroName = Object.keys(heroesObject)[randomHeroIndex];
        const randomHero = heroesObject[randomHeroName];
        
        // Crear un nuevo objeto con el héroe aleatorio
        randomHeroObject = {
            RandomHero: randomHero
        };

         // Añadir el nuevo atributo hitPoints al héroe aleatorio
         randomHero.powerstats.hitPoints = randomHero.powerstats.strength * 10;
         randomHero.powerstats.hitPoints = randomHero.powerstats.hitPoints > 666 ? 666 : randomHero.powerstats.hitPoints;
        
        console.log('Héroe aleatorio:', randomHeroObject);

        // Una vez que se han creado los objetos de los héroes, llamar a calculateStart
        calculateStart();
    } catch (error) {
        console.error('Error al inicializar:', error.message);
    }
}

// Función para calcular el valor total de (INT + COMB) para un jugador
function calculateStart() {
    if (!junkpileHeroObject || !randomHeroObject) {
        console.error('Uno o ambos héroes no están definidos.');
        return;
    }

    const junkPileStats = junkpileHeroObject.JunkPile.powerstats.intelligence  + junkpileHeroObject.JunkPile.powerstats.combat;
    const randomHeroStats = randomHeroObject.RandomHero.powerstats.intelligence  + randomHeroObject.RandomHero.powerstats.combat ;
    console.log('JunkPile Stats:', junkPileStats);
    console.log('Random Hero Stats:', randomHeroStats);
}
getHeroes();

module.exports = { getHeroes };
