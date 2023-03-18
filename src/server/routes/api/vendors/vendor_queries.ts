import express from 'express'
import { VendorModel } from '../../../db/models'
import { withAuth } from '../../../utils/auth'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const vendors = await VendorModel.find({})
    res.json({ vendors })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const vendor = await VendorModel.findOne({ _id: req.params.id })
    if (!vendor)
      res.status(400).json({ message: 'No vendor found with that ID.' })
    res.json({ vendor })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
