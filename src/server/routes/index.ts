import express from 'express'
import auth_routes from './AuthRoutes'
import user_routes from './UserRoutes'

const router = express.Router()
router.use('/auth', auth_routes)
router.use('/users', user_routes)

export default router
