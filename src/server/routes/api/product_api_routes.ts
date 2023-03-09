import express from 'express'
import { ProductModel } from '../../db/models'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find({})
    res.json({ products })
  } catch (err) {
    res.json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await ProductModel.find({ _id: req.params.id })
    res.json({ product })
  } catch (err) {
    res.json(err)
  }
})

router.post('/', async (req, res) => {
  const new_product = new ProductModel(req.body)
  try {
    const response = await new_product.save()
    res.json({ response })
  } catch (err) {
    res.json(err)
  }
})

router.put('/', async (req, res) => {
  const query = { _id: req.body.product_id }
  const update = { ...req.body.update_fields }
  try {
    const updated_product = await ProductModel.findOneAndUpdate(query, update)
    res.json({ updated_product })
  } catch (err) {
    res.json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted_product = await ProductModel.findByIdAndDelete(req.params.id)
    res.json({ deleted_product_id: deleted_product?._id })
  } catch (err) {
    res.json(err)
  }
})

export default router
