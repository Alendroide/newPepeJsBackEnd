const router = require('express').Router();
const postController = require('../controllers/post.controller');
const {verifyJWT} = require('../middlewares/verifyJWT');
const uploadImg = require('../middlewares/uploadImg');

router.get('/posts/page/:skip',verifyJWT(),postController.getAll());
router.get('/posts/:id',verifyJWT(),postController.getById());
router.post('/posts/',verifyJWT(),uploadImg,postController.create());

module.exports = router;