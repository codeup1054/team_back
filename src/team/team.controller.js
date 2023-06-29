const pool = require('../../db_env')
const queries = require ("./team.queries")
const {json} = require("express");

/**
/*  *********** 01. EmployeeService 02 *************
*/


const getTeam = (req, res) => {
  pool.query(queries.getTeam, (error,result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

const getTeamMateById = (req,res) => {
  const id = parseInt(req.params.id);
  // const id = req.params.id;
  console.log(`getTeamById = ${id}`);

  pool.query(queries.getTeamMateById, [id], (error,results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
  console.log("get emp");
};

const addTeamMate = (req,res) => {

  const {id_ext, status, fio, company, role, date_start, date_end, grade} = req.body;
  const body = req.body;
  const bodyKeys = Object.keys(body).join(",");
  const bodyVals = `'${Object.values(body).join("','")}'`;
  console.log("@@ addEmployer", bodyKeys, bodyVals)

  pool.query(queries.checkTeamMateExists, [fio,id_ext], (error, results) => {
    if (results.rows.length) {
      res.send({err:"Fio or ID_ext  exist"});
    } else {
      pool.query(queries.addTeamMate, [id_ext, status, fio, company, role, date_start, date_end, grade] , (error, results) => {
        if (error) throw error;
        res.status(201).send(results.rows)
      });
    }
  });
}


const deleteTeamMateById = (req,res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.checkTeamMateExists, [id], (error, results) => {
    console.log(`Try checkTeamMate = ${id}`);
    if (results.rows.length == 0) {
      res.send(`checkTeamMate not exist, ${id}`);
    } else {
      pool.query(queries.deleteTeamMateById, [id], (error, results) => {
        if (error) throw error;
        console.log(`checkTeamMateDeleted = ${id}`, this.query, results,
            (queries.deleteTeamMateById,[id]),
            JSON.stringify(results));

        res.status(200).send(`Removed [${JSON.toString(results)}]`)
      });
    }
  });
}

const updateTeamMate = (req,res) => {
  const body = req.body;
  const id = parseInt(req.params.id);

  const {id_ext, status, fio, firstname, company_name, role, date_start, date_end, grade} = body;

  console.log("updateEmployee", req.body, id);

  pool.query(queries.checkTeamMateExists, [fio, id], (error, results) => {
    if (!results.rows.length ) {
      res.send({err_msg:`Fio ${fio} doesn't exist`});
    } else {
      pool.query(queries.updateTeamMate, [id, id_ext, status, fio, firstname, company_name, role, date_start, date_end, grade], (error, results) => {
        if (error) throw error;
        res.status(201).send(results.rows);
      });
    }
  });
}


/**
 /*  *********** 01. CompanyService *************
 */


module.exports = {
  getTeam, getTeamMateById, addTeamMate, deleteTeamMateById, updateTeamMate
};
