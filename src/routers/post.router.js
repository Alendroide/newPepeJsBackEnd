const router = require('express').Router();
const postController = require('../controllers/post.controller');
const uploadImg = require('../middlewares/uploadImg');
const {verifyJWT} = require('../middlewares/verifyJWT');

router.get('/posts/page/:skip',verifyJWT(),postController.getAll());
router.get('/posts/:id',verifyJWT(),postController.getById());
router.get('/posts/user/:id',verifyJWT(),postController.getByUser());
router.post('/posts/',verifyJWT(),uploadImg,postController.create());

module.exports = router;