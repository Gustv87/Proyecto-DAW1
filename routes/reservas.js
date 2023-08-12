const express = require('express');
const laboratorio = express.Router();
const db = require('../db/conn');

laboratorio.post('', (req, res) => {
    let params =[

        req.body.id_lab,
        req.body.id_horario,
        req.body.id_usuario,
        req.body.fecha
      ];

 

        

    let sql = `INSERT INTO tbl_reservas (id_lab, id_horario, id_usuario, fecha) values ($1, $2, $3, $4) 
                                                            RETURNING id_reserva`;
     console.log(params)
                                                

    db.one(sql, params, event => event.id)
        .then(data => {
            const objetoCreado = {
                id_reserva: data,  
                id_lab: params[0],
                id_horario: params[1],
                id_usuario: params[2],
                fecha: params[3]
            }

            res.json(objetoCreado);
        })
        .catch(error => {
            res.json(error);
        });
});

laboratorio.get('', (req, res) => {
    let sql = "SELECT * FROM tbl_reservas where activo = true";


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
      UPDATE tbl_reservas 
      SET  id_reserva = $1
       id_lab=$2
       id_horario = $3
       id_usuario= $4
where fecha =$5
    `;

    db.query(sql, parametros)
        .then(data => {
            const objetoModificado = {
                id: id_reserva,
                id: id_lab,
                id: id_horario,
                id: id_usuario,
                fecha: fecha
            };

            res.json(objetoModificado);
        });
});

laboratorio.delete('/:id', async (req, res) => {
    try {
        const sql = `
            UPDATE tbl_reservas
            SET activo = false, fecha_borrado = current_timestamp
            WHERE id_reserva = $1
            id_lab = $2
            id_horario =$3
            id_usuario = $4
            fecha= $5
            RETURNING id_reserva, fecha_borrado
        `;
        
        const data = await db.oneOrNone(sql, [req.params.id]);

        if (data) {
            res.json({
                id_reserva: data.id_reserva,
                id_lab: data.id_lab,
                id_horario: data.id_horario,
                id_usuario: data.id_usuario,
                fecha : data.fecha,
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