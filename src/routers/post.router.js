const router = require('express').Router();
const postController = require('../controllers/post.controller');
const verifyJWT = require('../middlewares/verifyJWT');

router.get('/posts/page/:skip',verifyJWT(),postController.getAll());
router.get('/posts/:id',verifyJWT(),postController.getById());
router.post('/posts/',verifyJWT(),postController.create());

module.exports = router;