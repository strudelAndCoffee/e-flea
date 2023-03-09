import express from 'express'
import user_routes from './user_api_routes'
import vendor_routes from './vendor_api_routes'
import product_routes from './product_api_routes'
import tag_routes from './tag_api_routes'

const router = express.Router()
router.use('/users', user_routes)
router.use('/vendors', vendor_routes)
router.use('/products', product_routes)
router.use('/tags', tag_routes)

export default router
