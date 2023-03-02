import express from 'express'
import api_routes from './api'

const router = express.Router()
router.use('/api', api_routes)

export default router
