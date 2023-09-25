const express = require('express');
const reservas = express.Router();
const db = require('../db/conn');
const laboratorio = require('./laboratorio');
const usuario = require('./usuario');

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

reservas.put('/:id_reserva', (req, res) => {
    const id_reserva = req.params.id_reserva;
    const { laboratorio } = req.body;
    const { horainicio} = req.body;
    const { usuario }= req.body;
    const {fecha} = req.body;

    const parametros = [id_reserva, laboratorio, horainicio, usuario, fecha];

    const sql = `
      UPDATE tbl_reservas 
      SET  laboratorio = $2,
      horainicio = $3,
      usuario= $4,
      fecha = $5
where id_reserva = $1
      
    `;

    db.query(sql, parametros)
        .then(data => {
            const objetoModificado = {
                id_reserva: id_reserva,
                laboratorio: laboratorio,
                horainicio: horainicio,
                usuario: usuario,
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