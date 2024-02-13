const express = require('express');
const { getHeroes } = require('./gameController');

const app = express();
const port = 3000;

app.get('/heroes', getHeroes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
