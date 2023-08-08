const express = require('express');
const app = express();

app.use(express.json());``





// Inicio del servidor
const puerto = 3000;
app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});