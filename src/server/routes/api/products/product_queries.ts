import express from 'express'
import { ProductModel, VendorModel } from '../../../db/models'
import { withAuth } from '../../../utils/auth'

const router = express.Router()

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find({})
    res.json({ products })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await ProductModel.find({ _id: req.params.id })
    if (!product)
      res.status(400).json({ message: 'No product found with that ID.' })

    res.json({ product })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Get products by vendor ID
router.get('/vendor-products/:vendor_id', async (req, res) => {
  const vendor_id = req.params.vendor_id
  const vendor = await VendorModel.find({ _id: vendor_id })
  if (!vendor)
    res.status(400).json({ message: 'No vendor found with that ID.' })

  try {
    const products = await ProductModel.find({ vendor_id })
    res.json({ products })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
