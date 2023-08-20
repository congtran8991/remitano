import { Router } from 'express'
import usersControllers from '../Controllers/users'
import { authenticateJWT } from '../Utils'

const router = Router()

router.route('/').get(usersControllers.getAllUser)
router.route('/register').post(usersControllers.createNewUser)
router.route('/login').post(usersControllers.loginAccount)

export default router