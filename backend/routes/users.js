const router = require('express').Router();
const {getAllFollowing, getAllFollowers, getUserDetails, followUser, unfollowUser, findUsers} = require('../controllers/users');
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken);
router.get('/search', findUsers);
router.get('/followers/:userId', getAllFollowers);
router.get('/following/:userId', getAllFollowing);
router.get('/:userId', getUserDetails);
router.post('/:userId', followUser);
router.delete('/:userId', unfollowUser);

module.exports = router;