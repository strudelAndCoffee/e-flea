import express from 'express'
import vendor_queries from './vendor_queries.js'
import vendor_mutations from './vendor_mutations.js'

const router = express.Router()
router.use('/', vendor_queries)
router.use('/', vendor_mutations)

export default router
