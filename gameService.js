const axios = require('axios');

async function getSuperheroes() {
  try {
    const response = await axios.get('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');

    console.log('JUGADORES', response.data);

    return response.data;
  } catch (error) {
    console.error('Error al obtener los superhéroes:', error);
    throw error; 
  }
}


getSuperheroes();

module.exports = { getSuperheroes };