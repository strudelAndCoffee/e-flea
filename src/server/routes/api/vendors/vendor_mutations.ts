import express from 'express'
import { VendorModel } from '../../../db/models'
import { VendorType } from '../../../db/models/Vendor'
import { withAuth } from '../../../utils/auth'

const router = express.Router()

// Create new vendor
router.post('/', withAuth, async (req, res) => {
  const vendor_data: VendorType = req.body
  const new_vendor = await new VendorModel(vendor_data)

  try {
    const response = await new_vendor.save()
    res.json(response)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
