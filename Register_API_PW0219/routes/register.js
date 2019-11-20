var express = require('express');
var router = express.Router();
const RegisterController = require("../controllers/RegisterController");

/* GET All registers */
router.get('/', RegisterController.getAll);
router.get('/:id', RegisterController.getOneById);

router.post('/', RegisterController.insert);

router.put('/', RegisterController.update);

router.delete('/', RegisterController.deleteById);

router.get('/panic/all',RegisterController.panic);
module.exports = router;
