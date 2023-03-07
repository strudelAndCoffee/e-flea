import express from 'express'
import { UserModel } from '../../../db/models'

const router = express.Router()

router.get('/:username', async (req, res) => {
  const username = req.params.username
  const user = UserModel.findOne({ username })
  res.json(user)
})

export default router
