const { Router } = require ('express');
const controller = require ('./team.controller')
const express = require("express");
const app = require('express')();

const router = Router();

// app.use(express.json());

router.get ('/', controller.getTeam );
router.post ('/', controller.addTeamMate );
router.put ('/:id', controller.updateTeamMate );
router.get ('/:id', controller.getTeamMateById );
router.delete ('/:id', controller.deleteTeamMateById );


module.exports = router;
