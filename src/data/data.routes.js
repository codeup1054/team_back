const { Router } = require ('express');
const controller = require ('./data.controller')

const router = Router();

router.get ('/:type', controller.getItems );
router.post ('/', controller.addItem );
router.put ('/:id', controller.updateItem );
router.get ('/:id', controller.getItemById );
router.delete ('/:id', controller.deleteItemById );


module.exports = router;
