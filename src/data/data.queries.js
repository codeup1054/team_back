const getTeam = "Select  * from team order by id desc ";
const getCompanies = "Select  * from company order by id desc ";
const getItems = "Select  * from $1 order by id desc ";
const getItemById = "Select * from companies where id in ($1)";
const checkItemExists  = "Select * from companies where fio = $1 or id_ext =$2";
const addItem    = "insert INTO companies (id_ext, status, fio, companies, role, date_start, date_end, grade) VALUES  ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
const deleteItemById =  "DELETE from companies where id_ext = $1";
const updateItem    = "update companies set (id_ext, status, fio, companies, role, date_start, date_end, grade) =  ($1, $2, $3, $4, $5, $6, $7, $8) where id_ext = $1 RETURNING *";



module.exports = {
  getItems,
  getCompanies,
  getTeam,
  getItemById,
  checkItemExists,
  addItem,
  deleteItemById,
  updateItem,
}
