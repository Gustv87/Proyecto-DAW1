const express = require('express');
const laboratorio = express.Router();
const db = require('../db/conn');

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

laboratorio.put('/:id', (req, res) => {
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


laboratorio.delete('/:id', async (req, res) => {
    try {
        const sql = `
            UPDATE tbl_laboratorio
            SET activo = false, fecha_borrado = current_timestamp
            WHERE id_lab = $1
            RETURNING id_lab, fecha_borrado
        `;
        
        const data = await db.oneOrNone(sql, [req.params.id]);

        if (data) {
            res.json({
                id_lab: data.id_lab,
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

module.exports = laboratorio;