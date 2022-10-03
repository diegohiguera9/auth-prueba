const router = require('express').Router()
const userController = require('./user.controller')
const { auth } = require('../../utils/auth')

router.route('/singup').post(userController.singup)
router.route('/singin').post(userController.singin)
router.route('/show').get(auth,userController.show)
router.route('/list').get(userController.list)


module.exports = router