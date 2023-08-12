const express = require('express');
const rol = express.Router();
const db = require('../db/conn');

rol.post('/', (req, res) => {
    if (!req.body.nombre) {
        res.status(400).json({ error: 'Falta el campo nombre' });
        return;
    }

    const nombreRol = req.body.nombre;

    let datos = [nombreRol];

    let sql = `INSERT INTO tbl_rol (nombre) VALUES ($1) RETURNING id_rol`;

    db.one(sql, datos)
        .then(data => {
            const objetoCreado = {
                id: data.id_rol,
                nombre: nombreRol,
            };
            res.json(objetoCreado);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        });
});


rol.get('', (req, res) => {
    let sql = "SELECT * FROM tbl_rol where activo = true";


    db.any(sql, e => e.id)
        .then(rows => {
            res.setHeader('Content-Type', 'application/json');
            res.json(rows);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        });
});

rol.put('/:id', (req, res) => {
    const idrol = req.params.id;
    const { nombre } = req.body;

    const parametros = [nombre, idrol];

    const sql = `
      UPDATE tbl_rol 
      SET nombre = $1
      WHERE id_rol = $2
    `;

    db.query(sql, parametros)
        .then(data => {
            const objetoModificado = {
                id_rol: idrol,
                nombre: nombre
            };

            res.json(objetoModificado);
        });
});

rol.delete('/:id', async (req, res) => {
    try {
        const sql = `
            UPDATE tbl_rol
            SET activo = false, fecha_borrado = current_timestamp
            WHERE id_rol = $1
            RETURNING id_rol , fecha_borrado
        `;
        
        const data = await db.oneOrNone(sql, [req.params.id]);

        if (data) {
            res.json({
                id_rol: data.id_rol,
                nombre : data.nombre,
                activo: false,
                fecha_borrado: data.fecha_borrado
            });
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
});

module.exports = rol;