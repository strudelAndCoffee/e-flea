import express from 'express'
import { UserModel, VendorModel } from '../../../db/models'
import { VendorType } from '../../../db/models/Vendor'
import { withAuth } from '../../../utils/auth'

const router = express.Router()

// Create new vendor
router.post('/', async (req, res) => {
  const vendor_data: VendorType = req.body

  try {
    const new_vendor = await new VendorModel(vendor_data)
    const response = await new_vendor.save()
    res.json(response)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Delete Vendor by ID
router.delete('/:id', async (req, res) => {
  const vendor_id = req.params.id
  try {
    const response = await VendorModel.findByIdAndDelete(vendor_id)

    const removed_vendor_id = response!._id
    const owner_id = response!.owner_id
    await UserModel.findByIdAndUpdate(owner_id, {
      $pull: { owned_vendor_ids: removed_vendor_id },
    })

    res.json({ message: 'Vendor successfully deleted.' })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
