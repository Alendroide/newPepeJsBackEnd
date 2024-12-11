const { verifyLogged } = require('../middlewares/verifyJWT');
const router = require('express').Router();

router.post('/auth',verifyLogged());

module.exports = router;