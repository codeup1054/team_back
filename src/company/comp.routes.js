const { Router } = require ('express');
const controller = require ('./comp.controller')

const router = Router();

router.get ('/', controller.getCompanies );
router.post ('/', controller.addCompany );
router.put ('/:id', controller.updateCompany );
router.get ('/:id', controller.getCompanyById );
router.delete ('/:id', controller.deleteCompanyById );


module.exports = router;
