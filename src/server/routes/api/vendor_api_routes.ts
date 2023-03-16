import express from 'express'
import { VendorModel } from '../../db/models'
import { withAuth } from '../../utils/auth'

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

router.post('/', withAuth, async (req, res) => {
  const { owner_id, store_title, store_description, categories, image } =
    req.body

  try {
    const new_vendor = new VendorModel({
      owner_id,
      store_title,
      store_description,
      categories,
      image,
    })
    const response = await new_vendor.save()
    res.json({ response })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
