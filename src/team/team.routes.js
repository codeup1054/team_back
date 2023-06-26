const { Router } = require ('express');
const controller = require ('./team.controller')
const express = require("express");
const app = require('express')();

const router = Router();

// app.use(express.json());

router.get ('/', controller.getEmployees );
router.post ('/', controller.addEmployee );
router.put ('/:id', controller.updateEmployee );
router.get ('/:id', controller.getEmployeeById );
router.delete ('/:id', controller.deleteEmployeeById );


module.exports = router;
