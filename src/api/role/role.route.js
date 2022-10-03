const router = require('express').Router()
const roleController = require('./role.controller')

router.route('/create').post(roleController.create)
router.route('/list').get(roleController.list)

module.exports = router