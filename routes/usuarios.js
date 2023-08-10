const express =  require('express');
const app = express.Router();
const db = require('../db/conn');

app.use(bodyParser.json());

const users = [];

app.post ('/usuarios'), (req, res) =>{
    const { id, nombre, apellido, correo, contraseña, foto } = req.body;
} 
    
if (!id || !nombre || !apellido || !correo || !contraseña || !foto) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios'});
}

const nuevoUsuario = {
    id,
    nombre,
    apellido,
    correo,
    contraseña,
    foto,
  };

  users.push(nuevoUsuario);

  return res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
;

module.exports = laboratorio;