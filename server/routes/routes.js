//initialize express router
let router = require('express').Router();

//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});

//Import Bio Controller
var userController = require('../controllers/userConroller');

// Bio routes
router.route('/get')
.get(userController.index);

router.route('/signin')
    .post(userController.signin);

router.route('/register')
.post(userController.add);



//Export API routes
module.exports = router;