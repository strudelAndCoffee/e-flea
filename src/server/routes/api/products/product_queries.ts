import express from 'express'
import { ProductModel, VendorModel } from '../../../db/models'

const router = express.Router()

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find({})
    res.json(products)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Get product by ID
router.get('/:id', async (req, res) => {
  const product_id = req.params.id

  try {
    const product = await ProductModel.findById(product_id)
    res.json(product)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Get products by vendor ID
router.get('/vendor-products/:vendor_id', async (req, res) => {
  const vendor_id = req.params.vendor_id
  const vendor = await VendorModel.findById(vendor_id)
  if (!vendor)
    res.status(400).json({ message: 'No vendor found with that ID.' })

  try {
    const products = await ProductModel.find({ vendor_id })
    res.json(products)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
