const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all negocios
router.get('/negocios', (req, res) => {
  mysqlConnection.query('SELECT * FROM negocio', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An negocio
router.get('/negocios/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM negocio WHERE Id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An negocio
router.delete('/negocios/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM negocio WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'negocio Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An negocio
router.post('/negocios', (req, res) => {
    const { Nombre, contraseña, Localidad, ID_TS, Horario, capacidad} = req.body;
    console.log( Nombre, contraseña, Localidad, ID_TS, Horario, capacidad);
    const query = `insert into negocio (nombre, contraseña, Localidad, Id_TS, Horario, capacidad) values (?, ?, ?, ?, ?, ?)`;
    mysqlConnection.query(query, [Nombre, contraseña, Localidad, ID_TS, Horario, capacidad], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'negocio Saved'});
      } else {
        console.log(err);
      }
    });
  
  });

  router.put('/negocios/:Id', (req, res) => {
      const { Id, Fecha, Hora, FechaHora, Cant_per, ESTADO } = req.body;
    const query = `update negocio set nombre = ?, contraseña = ?, Horario = ?, capacidad = ? where Id = ?`;
    mysqlConnection.query(query, [Id, Fecha, Hora, FechaHora, Cant_per, ESTADO ,req.app.locals.IDCliente], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Employee Updated'});
      } else {
        console.log(err);
      }
    });
      
  });

  
module.exports = router;
