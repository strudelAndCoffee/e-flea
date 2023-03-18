import express from 'express'
import { ProductModel } from '../../../db/models'
import { ProductType } from '../../../db/models/Product'
import { withAuth } from '../../../utils/auth'

const router = express.Router()

// Create new product
router.post('/', withAuth, async (req, res) => {
  const product_data: ProductType = req.body
  const new_product = await new ProductModel(product_data)

  try {
    const response = await new_product.save()
    res.json({ response })
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
    if (!updated_product)
      res.status(400).json({ message: 'No product found with that ID.' })

    res.json({ updated_product })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Delete product by ID
router.delete('/:id', withAuth, async (req, res) => {
  const product_id = req.params.id

  try {
    const deleted_product = await ProductModel.findByIdAndDelete(product_id)
    if (!deleted_product)
      res.status(400).json({ message: 'No product found with that ID.' })

    res.json({ deleted_product_id: deleted_product?._id })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
