import express from 'express'
import product_queries from './product_queries'
import product_mutations from './product_mutations'

const router = express.Router()
router.use('/', product_queries)
router.use('/', product_mutations)

export default router
