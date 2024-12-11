const router = require('express').Router();
const userController = require('../controllers/user.controller');
const {verifyJWT} = require('../middlewares/verifyJWT');

router.get('/users/:id',verifyJWT(),userController.getById());
router.post('/register',userController.register());
router.post('/login',userController.login());

module.exports = router;