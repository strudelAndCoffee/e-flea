import express from 'express'
import { VendorModel } from '../../../db/models'

const router = express.Router()

// Get all vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await VendorModel.find({})
    res.json(vendors)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Get vendor by ID
router.get('/:id', async (req, res) => {
  const vendor_id = req.params.id

  try {
    const vendor = await VendorModel.findById(vendor_id)
    res.json(vendor)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
