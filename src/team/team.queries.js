
const getTeam = "Select *, '1' as grade  from team order by id_ext desc"
const getTeamMateById = "Select * from team where id in ($1)";
const checkTeamMateExists  = "Select * from team where id =$1";
const addTeamMate    = "insert INTO team (id_ext, status, fio, company_name, role, date_start, date_end, grade) VALUES  ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
// const addEmployee2    = "insert INTO team (id_ext,status,fio,company_name,role,date_start,date_end,grade) VALUES  ($1) RETURNING *";
const deleteTeamMateById =  "DELETE from team where id = $1";
const updateTeamMate    = "update team set (id_ext, status, fio, firstName, company_name, role, date_start, date_end, grade) =  ($2, $3, $4, $5, $6, $7, $8, $9, $10) where id = $1 RETURNING *";


module.exports = {
  getTeam: getTeam,
  getTeamMateById: getTeamMateById,
  checkTeamMateExists: checkTeamMateExists,
  addTeamMate: addTeamMate,
  deleteTeamMateById: deleteTeamMateById,
  updateTeamMate: updateTeamMate,
}
