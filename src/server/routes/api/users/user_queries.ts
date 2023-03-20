import express from 'express'
import { UserModel, VendorModel, OrderModel } from '../../../db/models'
import { withAuth, withVendorAuth, secret } from '../../../utils/auth'
import jwt from 'jsonwebtoken'

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

router.get('/vendor-account', (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.json({ message: 'no token' })

  const response = jwt.verify(token, secret)
  console.log(response)
  res.json(response)
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
  const user = await UserModel.findById(user_id)
  if (!user) res.status(400).json({ message: 'No user found with that ID.' })

  try {
    const owned_vendors = await VendorModel.find({
      _id: { $in: user?.owned_vendor_ids },
    })
    res.json(owned_vendors)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Get user's favorited vendors
router.get('/:id/favorite-vendors', withAuth, async (req, res) => {
  const user_id = req.params.id
  const user = await UserModel.findById(user_id)
  if (!user) res.status(400).json({ message: 'No user found with that ID.' })

  try {
    const favorite_vendors = await VendorModel.find({
      _id: { $in: user?.favorite_vendor_ids },
    })
    res.json(favorite_vendors)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Get user's saved products
router.get('/:id/saved-items', withAuth, async (req, res) => {
  const user_id = req.params.id
  const user = await UserModel.findById(user_id)
  if (!user) res.status(400).json({ message: 'No user found with that ID.' })

  try {
    const saved_items = await VendorModel.find({
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
  const user = await UserModel.findById(user_id)
  if (!user) res.status(400).json({ message: 'No user found with that ID.' })

  try {
    const past_orders = await OrderModel.find({ user_id })
    res.json(past_orders)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
