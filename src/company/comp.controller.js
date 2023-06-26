const pool = require('../../db_env')
const queries = require ("./comp.queries")

/**
/*  *********** 01. CompanyService 2023-06-07 *************

 id,  id_ext, address,  contact,  status,  company_name,

 */

const getCompanies = (req,res) => {
  pool.query(queries.getCompanies, (error,result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

const getCompanyById = (req,res) => {
  const id = parseInt(req.params.id);
  // const id = req.params.id;
  console.log(`getCompanyById = ${id}`);

  pool.query(queries.getCompanyById, [id], (error,results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
  console.log("get emp");
};


const addCompany = (req,res) => {
  const {id,  id_ext, address,  contact,  status,  company_name} = req.body;

  pool.query(queries.checkCompanyExists, [company_name,id_ext], (error, results) => {
    if (results.rows.length) {
      res.send("Company exist");
    } else {
      pool.query(queries.addCompany, [id,  id_ext, address,  contact,  status,  company_name], (error, results) => {
        if (error) throw error;
        res.status(201).send(`Created\n${JSON.stringify(results.rows)}`)
      });
    }
  });
}

const deleteCompanyById = (req,res) => {
  const id_ext = parseInt(req.params.id);
  console.log(`deleteCompanyById = ${id_ext}`);

  pool.query(queries.checkCompanyExists, [fio, id_ext], (error, results) => {
    if (results.rows.length === 0) {
      res.send(`Emp not exist ${fio}, ${id_ext}`);
    } else {
      pool.query(queries.deleteCompanyById, [id_ext], (error, results) => {
        if (error) throw error;
        res.status(200).send(`Removed [${results}]`)
      });
    }
  });
}


const updateCompany = (req,res) => {

  const body = req.body;
  const id_ext = parseInt(req.params.id);
  const {status, fio, company, role, date_start, date_end, grade} = body;

  console.log("updateCompany",body);

  pool.query(queries.checkEmpExists, [fio, id_ext], (error, results) => {
    if (!results.rows.length ) {
      res.send(`Fio ${fio} doesn't exist`);
    } else {
      pool.query(queries.updateCompany, [id_ext, status, fio, company, role, date_start, date_end, grade], (error, results) => {
        if (error) throw error;
        res.status(201).send(`Updated\n${JSON.stringify(results.rows)}`);
      });
    }
  });
}



module.exports = {
  getCompanies, getCompanyById, addCompany, deleteCompanyById, updateCompany
};
