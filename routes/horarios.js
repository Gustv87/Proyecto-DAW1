const express =  require('express');//const que es nuestra libreria de express
const app = express.Router();
const db = require('../db/conn');//conexion a la base de datos

app.post('', (req, res) => {
    try {
      let datos = [
        req.body.horainicio,
        req.body.horafinal
      ];
  
      let sql = `
        INSERT INTO tbl_horarios (horainicio, horafinal)
        VALUES ($1, $2)
        RETURNING id_horario
      `;
  
      db.one(sql, datos, event => event.id_horario)
        .then(data => {
          const objetoCreado = {
            id_horario: data.id_horario,
            horainicio: datos[0],
            horafinal: datos[1]
          };
  
          res.status(200).json(objetoCreado);
        })
        .catch((error) => {
          console.error('Error en la consulta a la base de datos:', error);
          res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        });
    } catch (error) {
      console.error('Error en la solicitud:', error);
      res.status(400).json({ error: 'Error en la solicitud' });
    }
  });
  

app.get('',(req, res)=>{

    let sql ="select * from tbl_horarios where activo = true";

    db.any(sql , e => e.id_horario)
    .then (rows =>{
        res.json(rows);
    })
    .catch((error)=>{
        res.json(error);
    })
})


app.put('/:id_horario', (req,res)=>{

    const parametros = [
        req.body.horainicio,
        req.body.horafinal,
        req.params.id_horario
    ];

    let sql = `update tbl_horarios
                set horainicio = $1,
                    horafinal = $2
                where id_horario = $3`;

    db.result(sql,parametros,r => r.rowCount) 
    .then(data=>{
        const objetoModificado = {  id_horario: req.params.id_horario,
                                    horainicio: req.body.horainicio, 
                                    horafinal: req.body.horafinal}
        res.json(objetoModificado);
    })
    .catch((error)=>{
        res.json(error);
    })
});

app.delete('/:id_horario', (req,res)=>{



    let sql = `update tbl_horarios
                set activo = false,
                    fecha_borrado = current_timestamp
                where id_horario = $1
                RETURNING id_horario, fecha_borrado`;

    db.result(sql,[req.params.id_horario],r => r.rowCount) 
    .then(data=>{
        const objetoBorrado = {  id_horario: req.params.id_horario,
                                    nombre: req.params.id_horario, 
                                    activo : false};
        res.json(objetoBorrado);
    })
    .catch((error)=>{
        res.json(error);
    })
})

module.exports = app;