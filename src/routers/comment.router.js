const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const {verifyJWT} = require('../middlewares/verifyJWT');

router.post('/comment/:post',verifyJWT(),commentController.create());

module.exports = router;