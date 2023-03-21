import express from 'express'
import {
  UserModel,
  VendorModel,
  OrderModel,
  ProductModel,
} from '../../../db/models'
import { withAuth } from '../../../utils/auth'

const router = express.Router()

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({})
    res.json(users)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Get user by ID
router.get('/:id', async (req, res) => {
  const user_id = req.params.id

  try {
    const user = await UserModel.findById(user_id)
    res.json(user)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Get user's owned vendors
router.get('/:id/owned-vendors', withAuth, async (req, res) => {
  const user_id = req.params.id

  try {
    const user = await UserModel.findById(user_id)
    const owned_vendors = await VendorModel.find({
      _id: { $in: user?.owned_vendor_ids },
    })

    res.json(owned_vendors)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Get user's saved products
router.get('/:id/saved-items', withAuth, async (req, res) => {
  const user_id = req.params.id

  try {
    const user = await UserModel.findById(user_id)
    const saved_items = await ProductModel.find({
      _id: { $in: user?.saved_item_ids },
    })

    res.json(saved_items)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Get user's past orders
router.get('/:id/past-orders', withAuth, async (req, res) => {
  const user_id = req.params.id

  try {
    const past_orders = await OrderModel.find({ user_id })
    res.json(past_orders)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Get user by email
router.get('/email/:email', async (req, res) => {
  const email = req.params.email
  const user = await UserModel.findOne({ email })

  if (user?._id) return res.json({ email_taken: true })
  res.json({ message: 'Email free for use.' })
})

// Get user by username
router.get('/username/:username', async (req, res) => {
  const username = req.params.username
  const user = await UserModel.findOne({ username })

  if (user?._id) return res.json({ name_taken: true })
  res.json({ message: 'Username free for use.' })
})

export default router
