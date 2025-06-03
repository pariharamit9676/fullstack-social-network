const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');
const { addLike, getLikes, removeLike } = require('../controllers/likes');

router.use(verifyToken);
router.post('/:id', addLike);
router.get('/:id', getLikes);
router.delete('/:id', removeLike);

module.exports = router;