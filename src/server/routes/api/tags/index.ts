import express from 'express'
import tag_queries from './tag_queries'
import tag_mutations from './tag_mutations'

const router = express.Router()
router.use('/', tag_queries)
router.use('/', tag_mutations)

export default router
