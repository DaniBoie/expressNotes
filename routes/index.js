const router = require('express').Router()

router.use('/api', require('./noteRoutes.js'))
router.use('/', require('./viewRoutes.js'))

module.exports = router
