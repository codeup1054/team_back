const pool = require('../../db_env')
const queries = require ("./data.queries")

/**
/*  *********** 01. ItemService 2023-06-29 *************
 id,  id_ext, address,  contact,  status,  company_name,
 */

const getItems = (req,res) => {
  const entityType = req.params.type;

  console.log("@@ entityType", entityType, req.params);
  const qs ={
    team: queries.getTeam,
    company: queries.getCompanies,
  }

  if (entityType in qs) {
      pool.query(qs[entityType], (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
      });
  }
  else
    res.status(200).json({msg:`No data for '${entityType}'`});
};

const getItemById = (req,res) => {
  const id = parseInt(req.params.id);
  // const id = req.params.id;
  console.log(`getItemById = ${id}`);

  pool.query(queries.getItemById, [id], (error,results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
  console.log("get emp");
};

const addItem = (req,res) => {
  const {id,  id_ext, address,  contact,  status,  company} = req.body;
  pool.query(queries.checkItemExists, [company_name,id_ext], (error, results) => {
    if (results.rows.length) {
      res.send(`Item exist ${company}`);
    } else {
      pool.query(queries.addItem, [id,  id_ext, address,  contact,  status,  company_name], (error, results) => {
        if (error) throw error;
        res.status(201).send(`Created\n${JSON.stringify(results.rows)}`)
      });
    }
  });
}

const deleteItemById = (req,res) => {
  const id_ext = parseInt(req.params.id);
  console.log(`deleteItemById = ${id_ext}`);

  pool.query(queries.checkItemExists, [fio, id_ext], (error, results) => {
    if (results.rows.length === 0) {
      res.send(`Emp not exist ${fio}, ${id_ext}`);
    } else {
      pool.query(queries.deleteItemById, [id_ext], (error, results) => {
        if (error) throw error;
        res.status(200).send(`Removed [${results}]`)
      });
    }
  });
}


const updateItem = (req,res) => {

  const body = req.body;
  const id_ext = parseInt(req.params.id);
  const {status, fio, company, role, date_start, date_end, grade} = body;

  console.log("updateItem",body);

  pool.query(queries.checkEmpExists, [fio, id_ext], (error, results) => {
    if (!results.rows.length ) {
      res.send(`Fio ${fio} doesn't exist`);
    } else {
      pool.query(queries.updateItem, [id_ext, status, fio, company, role, date_start, date_end, grade], (error, results) => {
        if (error) throw error;
        res.status(201).send(`Updated\n${JSON.stringify(results.rows)}`);
      });
    }
  });
}



module.exports = {
  getItems, getItemById, addItem, deleteItemById, updateItem
};
