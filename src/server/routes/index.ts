import express from 'express'
import auth_routes from './AuthRoutes'
import user_routes from './UserRoutes'
import order_routes from './OrderRoutes'

const router = express.Router()
router.use('/auth', auth_routes)
router.use('/users', user_routes)
router.use('/orders', order_routes)

export default router
