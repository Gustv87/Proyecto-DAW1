const express = require('express');
const usuario = express.Router();
const db = require('../db/conn');

usuario.post('/', async (req, res) => {
  try {
    const correo = req.body.correo;
    const contrasenia = req.body.contrasenia;

    // Verificar si el usuario existe en la base de datos
    const sql = `
      SELECT id_usuario, nombre, apellido, correo, id_rol
      FROM tbl_usuario
      WHERE correo = $1 AND contrasenia = $2 AND activo = true
    `;
    const data = await db.oneOrNone(sql, [correo, contrasenia]);

    if (data) {
      if (data.id_rol === 1) {
        // Usuario es administrador
        res.json({ mensaje: 'Inicio de sesión exitoso como administrador', user: data });
      } else {
        // Usuario es usuario normal
        res.json({ mensaje: 'Inicio de sesión exitoso como usuario normal', user: data });
      }
    } else {
      // Las credenciales son incorrectas o el usuario no existe
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la consulta a la base de datos' });
  }
});


module.exports = usuario;

