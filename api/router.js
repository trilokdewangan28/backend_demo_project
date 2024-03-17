const router = require('./routes');
const auth = require('../middleware/auth')
const controller = require('./controller');
const upload = require('../middleware/uploads');



router.post('/userSignup', controller.userSignup);
router.post('/addProduct', controller.addProduct);
router.get('/fetchProduct', controller.fetchProduct);
router.post('/loginUser', controller.loginUser);
router.get('/userProfile', auth.authenticateToken, controller.userProfile);
router.post('/uploadProfilePic', auth.authenticateToken, upload.single('customerProfilePic') ,controller.uploadProfilePic);
module.exports = router;
