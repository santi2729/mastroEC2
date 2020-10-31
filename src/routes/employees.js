const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Employees
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM clientes', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An Employee
router.get('/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM clientes WHERE Id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An Employee
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM clientes WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Employee Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An Employee
router.post("/", (req, res) => {
  const { Nombre, Apellido, Correo, password, DNI } = req.body;
  console.log(Nombre, Apellido, Correo, password, DNI);
  const query = `insert into clientes (Nombre, Apellido, Correo, password, DNI) values (?, ?, ?, ?, ?)`;
  mysqlConnection.query(
    query,
    [Nombre, Apellido, Correo, password, DNI],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Employee Saved" });
      } else {
        res.send(err);
      }
    }
  );
});

router.put("/:Id", (req, res) => {
  const { Nombre, Apellido, Correo, password, DNI } = req.body;
  const id = req.params.Id;
  const query = `update Clientes set Nombre = ?, Apellido = ?, Correo = ?, password = ?, DNI = ? where Id = ?`;
  mysqlConnection.query(
    query,
    [Nombre, Apellido, Correo, password, DNI, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Employee Updated" });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
