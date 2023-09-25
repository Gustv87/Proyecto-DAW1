const express = require('express');
const usuario = express.Router();
const db = require('../db/conn');

usuario.post('/', async (req, res) => {
  let nombre = req.body.nombre;
  let apellido = req.body.apellido;
  let correo = req.body.correo;
  let contrasenia = req.body.contrasenia;
  let id_rol = 2;

  try {
    await db.tx(async t => {
      const correoExistente = await t.oneOrNone('SELECT correo FROM tbl_usuario WHERE correo = $1', [correo]);
      if (correoExistente) {
        // El correo electrónico ya existe, devolver un error
        res.status(400).json({ error: 'El correo electrónico ya está registrado' });
      } else {
        const data = await t.one('INSERT INTO tbl_usuario (nombre, apellido, correo, contrasenia, id_rol) VALUES ($1, $2, $3, $4, $5) RETURNING id_usuario, id_rol', [nombre, apellido, correo, contrasenia, id_rol]);
        const objetoCreado = {
          id: data.id_usuario,
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          correo: req.body.correo,
          contrasenia: req.body.contrasenia,
          id_rol: data.id_rol
        };
        res.json(objetoCreado);
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en la consulta a la base de datos' });
  }
});

usuario.get('', (req, res) => {
  let sql = "SELECT * FROM tbl_usuario where activo = true";

  db.any(sql, e => e.id)
    .then(rows => {
      res.setHeader('Content-Type', 'application/json');
      res.json(rows);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    });
});

usuario.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { nombre, apellido, correo, contrasenia } = req.body;

    // Verifica que el usuario exista en la base de datos
    const existingUser = await db.oneOrNone('SELECT * FROM tbl_usuario WHERE id_usuario = $1', userId);
    if (!existingUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualiza el usuario en la base de datos
    const updatedUser = await db.one(
      `UPDATE tbl_usuario
         SET nombre = $1, apellido = $2, correo = $3, contrasenia = $4, id_rol = $5
         WHERE id_usuario = $6
         RETURNING *`,
      [nombre, apellido, correo, contrasenia, id_rol, userId]
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la consulta a la base de datos' });
  }
});


usuario.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Verifica que el usuario exista en la base de datos
    const existingUser = await db.oneOrNone('SELECT * FROM tbl_usuario WHERE id_usuario = $1', userId);
    if (!existingUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Desactiva el usuario en la base de datos
    const sql = `
        UPDATE tbl_usuario
        SET activo = false, fecha_borrado = current_timestamp
        WHERE id_usuario = $1
        RETURNING id_usuario, fecha_borrado
      `;
    const data = await db.one(sql, [userId]);

    res.json({
      id_usuario: data.id_usuario,
      activo: false,
      fecha_borrado: data.fecha_borrado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la consulta a la base de datos' });
  }
});

module.exports = usuario;