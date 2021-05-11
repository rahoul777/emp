const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const Employee = require('../models/employee.js');

// Base path http://localhost:3000/employees
// Get, Post, Put, Delete
// Get All Employee api
router.get('/', (req, res) => {
    Employee.find( (err, doc) => {
        if (err) {
            console.log('Error in get request' + err);
        } else {
            res.send(doc);
        }
    });
});
// Get Single Employee api
router.get('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Employee.findById(req.params.id, (err, doc) => {
            if (err) {
                console.log('Error in get employee by id request' + err);
            } else {
                res.send(doc);
            }
        });
    } else {
        return res.status(400).send('No record found with id' + req.params.id);
    }
});
// Post api
router.post('/', (req, res) => {
    let emp = new Employee({
        name : req.body.name,
        position : req.body.position,
        dept : req.body.dept
    });

    emp.save( (err, doc) => {
        if (err) {
            console.log('Error in post request' + err);
        } else {
            res.send(doc);
        }
    });
});

// Delete API
router.delete('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Employee.findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) {
                console.log('Error in delete employee by id request' + err);
            } else {
                res.send(doc);
            }
        });
    } else {
        return res.status(400).send('No record found with id' + req.params.id);
    }
});

// PUT API / Update API
router.put('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        let emp = {
            name : req.body.name,
            position : req.body.position,
            dept : req.body.dept
        };
        Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true},(err, doc) => {
            if (err) {
                console.log('Error in update employee by id request' + err);
            } else {
                res.send(doc);
            }
        });
    } else {
        return res.status(400).send('No record found with id' + req.params.id);
    }
});

module.exports = router;