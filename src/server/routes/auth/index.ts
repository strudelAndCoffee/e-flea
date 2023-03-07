import express from 'express'
import user_routes from './user_routes'

const router = express.Router()
router.use('/users', user_routes)

export default router