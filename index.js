require('dotenv').config();
const { app, port } = require('./src/server/server');

app.listen(port, () => {
  console.log(`Servidor up en http://localhost:${port}`);
});