

const getEmployees = "Select *, '1' as grade  from employees order by id_ext desc"
const getEmployeeById = "Select * from employees where id in ($1)";
const checkEmpExists  = "Select * from employees where fio = $1 or id_ext =$2";
const addEmployee    = "insert INTO employees (id_ext, status, fio, company_name, role, date_start, date_end, grade) VALUES  ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
const addEmployee2    = "insert INTO employees (id_ext,status,fio,company_name,role,date_start,date_end,grade) VALUES  ($1) RETURNING *";
const deleteEmployeeById =  "DELETE from employees where id_ext = $1";
const updateEmployee    = "update employees set (id_ext, status, fio, firstName, company_name, role, date_start, date_end, grade) =  ($2, $3, $4, $5, $6, $7, $8, $9, $10) where id = $1 RETURNING *";



module.exports = {
  getEmployees,
  getEmployeeById,
  checkEmpExists,
  addEmployee,
  addEmployee2,
  deleteEmployeeById,
  updateEmployee,
}
