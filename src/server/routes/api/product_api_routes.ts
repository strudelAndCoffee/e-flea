import express from 'express'
import { Schema } from 'mongoose'
import { ProductModel, VendorModel } from '../../db/models'
import { withAuth } from '../../utils/auth'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find({})
    if (!products) res.status(400).json({ message: 'No products found.' })

    res.json({ products })
  } catch (err) {
    res.json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await ProductModel.find({ _id: req.params.id })
    if (!product)
      res.status(400).json({ message: 'No product found with that ID.' })

    res.json({ product })
  } catch (err) {
    res.json(err)
  }
})

router.get('/vendor-products/:vendor_id', async (req, res) => {
  const vendor_id = req.params.vendor_id
  const vendor = await VendorModel.find({ _id: vendor_id })
  if (!vendor)
    res.status(400).json({ message: 'No vendor found with that ID.' })

  try {
    const products = await ProductModel.find({ vendor_id: vendor_id })
    res.json({ products })
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
