import express from 'express'
import order_queries from './order_queries.js'
import order_mutations from './order_mutations.js'

const router = express.Router()
router.use('/', order_queries)
router.use('/', order_mutations)

export default router
