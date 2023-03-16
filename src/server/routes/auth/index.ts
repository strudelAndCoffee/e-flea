import express from 'express'
import user_routes from './user_auth_routes'
import checkout_routes from './checkout_auth_routes'

const router = express.Router()
router.use('/users', user_routes)
router.use('/checkout', checkout_routes)

export default router
