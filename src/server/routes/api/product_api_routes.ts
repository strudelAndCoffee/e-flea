import express from 'express'
import { ProductModel } from '../../db/models'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find({})
    res.json(products)
  } catch (err) {
    res.json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await ProductModel.find({ _id: req.params.id })
    res.json(product)
  } catch (err) {
    res.json(err)
  }
})

router.post('/', async (req, res) => {
  const new_product = new ProductModel(req.body)
  try {
    const response = await new_product.save()
    res.json(response)
  } catch (err) {
    res.json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted_product = await ProductModel.findOneAndDelete({
      _id: req.params.id,
    })
    res.json(deleted_product)
  } catch (err) {
    res.json(err)
  }
})

export default router
