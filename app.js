const express = require('express');
const app = express();


app.use(express.json());

//Rutas
const laboratorio = require('./routes/laboratorio.js');
app.use('/api/laboratorio', laboratorio);

// Inicio del servidor
const puerto = 3000;
app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});



