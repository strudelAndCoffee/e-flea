import express from 'express'
import { ProductModel, VendorModel } from '../../../db/models'
import { withAuth } from '../../../utils/auth'

const router = express.Router()

router.post('/', async (req, res) => {
  const new_product = new ProductModel(req.body)
  try {
    const response = await new_product.save()
    res.json({ response })
  } catch (err) {
    res.json(err)
  }
})

router.put('/', withAuth, async (req, res) => {
  const query = { _id: req.body.product_id }
  const update = { ...req.body.update_fields }
  try {
    const updated_product = await ProductModel.findOneAndUpdate(query, update)
    if (!updated_product)
      res.status(400).json({ message: 'No product found with that ID.' })

    res.json({ updated_product })
  } catch (err) {
    res.json(err)
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleted_product = await ProductModel.findByIdAndDelete(req.params.id)
    if (!deleted_product)
      res.status(400).json({ message: 'No product found with that ID.' })

    res.json({ deleted_product_id: deleted_product?._id })
  } catch (err) {
    res.json(err)
  }
})

export default router
