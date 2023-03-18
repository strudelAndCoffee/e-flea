import express from 'express'
import { TagModel } from '../../../db/models'

const router = express.Router()

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = TagModel.find({})
    res.send(tags)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Get tag by ID
router.get('/:id', (req, res) => {
  const tag_id = req.params.id

  try {
    const tag = TagModel.findById(tag_id)
    res.send(tag)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
