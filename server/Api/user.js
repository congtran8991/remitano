const express = require('express')
const usersControllers = require('../Controllers/users')
const { authenticateJWT } = require('../Utils')

const router = express.Router()

router.route('/').get(authenticateJWT,usersControllers.getAllUser)
router.route('/register').post(usersControllers.createNewUser)
router.route('/login').post(usersControllers.loginAccount)
router.route('/refresh-token').post(usersControllers.refreshTokenService)


module.exports = router