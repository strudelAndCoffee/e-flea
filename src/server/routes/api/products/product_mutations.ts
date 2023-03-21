import express from 'express'
import { ProductModel, VendorModel } from '../../../db/models'
import { ProductType } from '../../../db/models/Product'
import { withAuth } from '../../../utils/auth'

const router = express.Router()

// Create new product
router.post('/', withAuth, async (req, res) => {
  const product_data: ProductType = req.body
  const new_product = await new ProductModel(product_data)

  try {
    const response = await new_product.save()
    res.json(response)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Update product by ID
router.put('/:id', withAuth, async (req, res) => {
  const query = { _id: req.params.id }
  const update = { ...req.body.update_fields }

  try {
    const updated_product = await ProductModel.findOneAndUpdate(query, update)
    res.json(updated_product)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Delete product by ID
router.delete('/:id', withAuth, async (req, res) => {
  const product_id = req.params.id

  try {
    const response = await ProductModel.findByIdAndDelete(product_id)

    const removed_product_id = response!._id
    const vendor_id = response!.vendor_id
    await VendorModel.findByIdAndUpdate(vendor_id, {
      $pull: { product_ids: removed_product_id },
    })

    res.json({ message: 'Product successfully deleted.' })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
