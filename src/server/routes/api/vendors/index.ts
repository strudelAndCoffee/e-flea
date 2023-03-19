import express from 'express'
import vendor_queries from './vendor_queries'
import vendor_mutations from './vendor_mutations'

const router = express.Router()
router.use('/', vendor_queries)
router.use('/', vendor_mutations)

export default router
