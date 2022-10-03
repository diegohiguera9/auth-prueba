const router = require('express').Router()
const { auth } = require('../../utils/auth')
const { authRole, authProject } = require('../../utils/otherAuth')
const projectsController = require("./projects.controller")

router.route('/create').post(auth,projectsController.create)
router.route('/list').get(auth,authRole('admin'),projectsController.list)
router.route('/:projectId').get(auth,authProject('admin'),projectsController.show)

module.exports = router