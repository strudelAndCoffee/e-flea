import express from 'express'
import user_routes from './users'
import vendor_routes from './vendors'
import product_routes from './products'
import tag_routes from './tags'
import order_routes from './orders'

const router = express.Router()
router.use('/users', user_routes)
router.use('/vendors', vendor_routes)
router.use('/products', product_routes)
router.use('/tags', tag_routes)
router.use('/orders', order_routes)

export default router
