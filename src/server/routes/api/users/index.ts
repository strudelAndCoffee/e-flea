import express from 'express'
import user_queries from './user_queries.js'
import user_mutations from './user_mutations.js'

const router = express.Router()
router.use('/', user_queries)
router.use('/', user_mutations)

export default router
