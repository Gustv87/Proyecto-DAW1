const express = require('express');
const laboratorio = express.Router();
const db = require('../db/db');

laboratorio.post('/', (req, res) => {
    if (!req.body.nombre) {
        res.status(400).json({ error: 'Falta el campo nombre' });
        return;
    }

    const nombreLaboratorio = req.body.nombre;

    let datos = [nombreLaboratorio];

    let sql = `INSERT INTO tbl_laboratorio (nombre) VALUES ($1) RETURNING id_lab`;

    db.one(sql, datos)
        .then(data => {
            const objetoCreado = {
                id: data.id_lab,
                nombre: nombreLaboratorio,
            };
            res.json(objetoCreado);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        });
});

laboratorio.get('/', (req, res) => {
    let sql = "SELECT * FROM tbl_laboratorio ";

    db.any(sql, e => e.id)
        .then(rows => {
            res.setHeader('Content-Type', 'application/json');
            res.json(rows);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        });
});





laboratorio.put('/api/laboratorio/:id', (req, res) => {
    const idlab = req.params.id;
    const { nombre } = req.body;

    const parametros = [nombre, idlab];

    const sql = `
      UPDATE tbl_laboratorio 
      SET nombre = $1
      WHERE id_lab = $2
    `;

    db.query(sql, parametros)
        .then(data => {
            const objetoModificado = {
                id_lab: idlab,
                nombre: nombre
            };

            res.json(objetoModificado);
        });
});

laboratorio.delete('/api/laboratorio/:id', (req, res) => {
    const idHeroe = req.params.id;

    const sql = `
      UPDATE tbl_heroes 
      SET activo = false, 
          fecha_borrar = current_timestamp 
      WHERE id = $1
    `;

    db.result(sql, [idHeroe], r => r.rowCount)
        .then(data => {
            const objetoBorrado = {
                id: idHeroe,
                activo: false
            };
            res.json(objetoBorrado);
        })
        .catch(error => {

            res.json({ error: 'Hubo un error en el servidor al marcar el héroe como inactivo.' });
        });
});


module.exports = laboratorio;