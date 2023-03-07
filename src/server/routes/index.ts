import express from 'express'
import api_routes from './api'
import auth_routes from './auth'

const router = express.Router()
router.use('/api', api_routes)
router.use('/auth', auth_routes)

export default router
