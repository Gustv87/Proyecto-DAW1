const express = require('express');
const app = express();
app.use(express.json());

//Rutas
const laboratorio = require('./routes/laboratorio.js');
app.use('/api/laboratorio', laboratorio);

const horarios = require('./routes/horarios.js');
app.use('/api/horarios', horarios);

const reservas = require('./routes/reservas.js');
app.use('/api/reservas',reservas);

const usuario = require('./routes/usuario.js');
app.use('/api/usuario',usuario);


// Inicio del servidor
const puerto = 3000;
app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});



