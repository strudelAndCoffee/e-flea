import express from 'express'
import vendor_routes from './vendor_routes'
import product_routes from './product_routes'

const router = express.Router()
router.use('/vendors', vendor_routes)
router.use('/products', product_routes)

export default router
