const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all turnos
router.get('/turnos', (req, res) => {
  mysqlConnection.query('SELECT * FROM turnos', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An turnos
router.get('/turnos/especifico/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM turnos WHERE id_Cliente = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An turnos
router.delete('/turnos/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM turnos WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'turnos Deleted'});
    } else {
      console.log(err);
    }
  });
});

router.put('/turnos/hola/:id', (req, res) => {
      const { Fecha, Hora, Cant_per } = req.body;
      const id = req.params.id;
      console.log(req.params.id)
      const query = `update turnos set Fecha = ?, Hora = ?, Cant_per = ?, ESTADO = null where Id = ?`;
      mysqlConnection.query(
        query,
        [Fecha, Hora, Cant_per, id],
        (err, rows, fields) => {
          if (!err) {
            res.json({ status: "Employee Updated" });
          } else {
            console.log(err);
          }
        }
      );
  });

  // INSERT An turnos
router.post("/turnos/:ID_Cliente", (req, res) => {
        const { Fecha, Hora, Cant_per, Negocio, } = req.body;
        const ID_Cliente = req.params.ID_Cliente
        console.log(req.body);
        console.log(Fecha, Hora, Cant_per, Negocio, ID_Cliente);
        const query = `insert into turnos (Fecha, Hora, Cant_per, ID_negocio, ID_Cliente) values (?, ?, ?, ?, ?)`;
        mysqlConnection.query(
          query,
          [Fecha, Hora, Cant_per, Negocio, ID_Cliente],
          (err, rows, fields) => {
            console.log(Fecha, Hora, Cant_per);
            if (!err) {
              res.json({ status: "Turno creado" });
            } else {
              res.send(err)
            }
          }
        );
    });


  
  // GET Ver todos los turnos No Confirmados del negocio
router.get('/turnos/null/:ID_Negocio', (req, res) => {
    const  ID_Negocio  = req.params.ID_Negocio; 
    mysqlConnection.query('SELECT * FROM turnos WHERE  ESTADO IS NULL AND Id_Negocio = ? ', [ID_Negocio], (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });

  //PUT Actualizar turnos para confirmarlos
  router.put("/turnos/confirmar/:ID_TURNO", (req, res) => {
    const { ESTADO } = req.body;
    const id = req.params.ID_TURNO;
    console.log(req.params.ID_TURNO)
    const query = `update turnos set ESTADO = ? where Id = ?`;
    console.log(ESTADO);
    console.log(id);
    mysqlConnection.query(
      query,
      [ESTADO, id],
      (err, rows, fields) => {
        console.log(id)
        if (!err) {
          res.json({ status: "Turno Actualizado" });
        } else {
          console.log(err);
        }
      }
    );
});
  //GET Ver turnos calendario Negocio
router.get('/turnos/calendario/:ID_Negocio', (req, res) => {
  const  ID_Negocio  = req.params.ID_Negocio;
  const numero = 1
  mysqlConnection.query('SELECT * FROM turnos WHERE  ESTADO = ? and Id_Negocio = ? ', [numero,ID_Negocio], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

  //GET Ver turnos calendario Cliente
  router.get('/turnos/green/:ID_Cliente', (req, res) => {
    const  ID_Cliente  = req.params.ID_Cliente;
    const numero = 1
    mysqlConnection.query('SELECT * FROM turnos WHERE  ESTADO = ? and Id_Cliente = ? ', [numero,ID_Cliente], (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });

  //GET Ver los turnos rechazados del Cliente
router.get('/turnos/red/:ID_Negocio', (req, res) => {
  const  ID_Negocio  = req.params.ID_Negocio;
  const numero = 0
  mysqlConnection.query('SELECT * FROM turnos WHERE  ESTADO = ? and Id_Cliente = ? ', [numero,ID_Negocio], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});
  //GET Ver el historial de turnos del Cliente
router.get('/turnos/historialC/:ID_Cliente', (req, res) => {
  const  ID_Cliente  = req.params.ID_Cliente;
  mysqlConnection.query('SELECT * FROM turnos WHERE Id_Cliente = ? ', [numero,ID_Cliente], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});


module.exports = router;