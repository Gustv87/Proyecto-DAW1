const express = require('express');
const reservas = express.Router();
const db = require('../db/conn');

reservas.post('', (req, res) => {
    let params =[

        req.body.laboratorio,
        req.body.horainicio,
        req.body.usuario,
        req.body.fecha
      ];

 

        

    let sql = `INSERT INTO tbl_reservas (laboratorio, horainicio, usuario, fecha) values ($1, $2, $3, $4) 
                                                            RETURNING id_reserva`;
     console.log(params)
                                                

    db.one(sql, params, event => event.id)
        .then(data => {
            const objetoCreado = {
                id_reserva: data,  
                laboratorio: params[0],
                horainicio: params[1],
                usuario: params[2],
                fecha: params[3]
            }

            res.json(objetoCreado);
        })
        .catch(error => {
            res.json(error);
        });
});

reservas.get('', (req, res) => {
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

reservas.put('/:id', (req, res) => {
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

reservas.delete('/:id_reserva', (req, res) => {
    let sql = ` update tbl_reservas
                set activo = false , 
                    fecha_borrado = current_timestamp 
                where id_reserva = $1 `;

    db.result(sql, [req.params.id_reserva] ,   r => r.rowCount)
        .then(data => {

            const objetoBorrado     = {  id_reserva : req.params.id_reserva, 
                                        activo : false   };
            
            res.json(objetoBorrado);

        })
        .catch((error) => {
            res.json(error);
        });

});


module.exports = reservas;