const pool = require('../../db')
const queries = require ("./team.queries")

/**
/*  *********** 01. EmployeeService 02 *************
*/


const getEmployees = (req,res) => {
  pool.query(queries.getEmployees, (error,result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

const getEmployeeById = (req,res) => {
  const id = parseInt(req.params.id);
  // const id = req.params.id;
  console.log(`getEmployeeById = ${id}`);

  pool.query(queries.getEmployeeById, [id], (error,results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
  console.log("get emp");
};

const addEmployee = (req,res) => {

  const {id_ext, status, fio, company, role, date_start, date_end, grade} = req.body;
  const body = req.body;
  const bodyKeys = Object.keys(body).join(",");
  const bodyVals = `'${Object.values(body).join("','")}'`;
  console.log("@@ addEmployer", bodyKeys, bodyVals)

  pool.query(queries.checkEmpExists, [fio,id_ext], (error, results) => {
    if (results.rows.length) {
      res.send({err:"Fio or ID_ext  exist"});
    } else {
      pool.query(queries.addEmployee, [id_ext, status, fio, company, role, date_start, date_end, grade] , (error, results) => {
        if (error) throw error;
        res.status(201).send(results.rows)
      });
    }
  });
}


const deleteEmployeeById = (req,res) => {
  const id_ext = parseInt(req.params.id);
  console.log(`deleteEmployeeById = ${id_ext}`);

  pool.query(queries.checkEmpExists, [fio, id_ext], (error, results) => {
    if (results.rows.length == 0) {
      res.send(`Emp not exist ${fio}, ${id_ext}`);
    } else {
      pool.query(queries.deleteEmployeeById, [id_ext], (error, results) => {
        if (error) throw error;
        res.status(200).send(`Removed [${results}]`)
      });
    }
  });
}



const updateEmployee = (req,res) => {

  const body = req.body;
  const id = parseInt(req.params.id);


  const {id_ext, status, fio, firstname, company_name, role, date_start, date_end, grade} = body;

  console.log("updateEmployee", req.body, id_ext);

  pool.query(queries.checkEmpExists, [fio, id_ext], (error, results) => {
    if (!results.rows.length ) {
      res.send({err_msg:`Fio ${fio} doesn't exist`});
    } else {
      pool.query(queries.updateEmployee, [id, id_ext, status, fio, firstname, company_name, role, date_start, date_end, grade], (error, results) => {
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
  getEmployees, getEmployeeById, addEmployee, deleteEmployeeById, updateEmployee
};
