
const getCompanies = "Select * from companies order by id_ext desc ";
const getCompanyById = "Select * from companies where id in ($1)";
const checkCompanyExists  = "Select * from companies where fio = $1 or id_ext =$2";
const addCompany    = "insert INTO companies (id_ext, status, fio, companies, role, date_start, date_end, grade) VALUES  ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
const deleteCompanyById =  "DELETE from companies where id_ext = $1";
const updateCompany    = "update companies set (id_ext, status, fio, companies, role, date_start, date_end, grade) =  ($1, $2, $3, $4, $5, $6, $7, $8) where id_ext = $1 RETURNING *";



module.exports = {
  getCompanies,
  getCompanyById,
  checkCompanyExists,
  addCompany,
  deleteCompanyById,
  updateCompany,
}
