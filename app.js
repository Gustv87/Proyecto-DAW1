const express = require('express');
const app = express();
app.use(express.json());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

//Rutas
const laboratorio = require('./routes/laboratorio.js');
app.use('/api/laboratorio', laboratorio);

const horarios = require('./routes/horarios.js');
app.use('/api/horarios', horarios);

const reservas = require('./routes/reservas.js');
app.use('/api/reservas',reservas);

const usuario = require('./routes/usuario.js');
app.use('/api/usuario',usuario);

const rol = require('./routes/rol.js');
app.use('/api/rol', rol);

const login = require('./routes/login.js');
app.use('/api/login', login);


// Inicio del servidor
const puerto = 3000;
app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});



