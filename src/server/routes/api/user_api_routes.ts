import express from 'express'
import { UserModel, VendorModel } from '../../db/models'

const router = express.Router()

router.get('/', async (req, res) => {
  const { username, email } = req.body
  let query
  if (username) query = { username: username }
  else if (email) query = { email: email }

  try {
    const user = await UserModel.findOne({ query })
    res.json({ user })
  } catch (err) {
    res.json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id })
    res.json({ user })
  } catch (err) {
    res.json(err)
  }
})

router.get('/:id/owned-vendors', async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id })
    const owned_vendors = await VendorModel.find({
      _id: { $in: user?.owned_vendor_ids },
    })
    res.json({ owned_vendors })
  } catch (err) {
    res.json(err)
  }
})

router.get('/:id/favorite-vendors', async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id })
    const favorite_vendors = await VendorModel.find({
      _id: { $in: user?.favorite_vendor_ids },
    })
    res.json({ favorite_vendors })
  } catch (err) {
    res.json(err)
  }
})

router.get('/:id/saved-items', async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id })
    const saved_items = await VendorModel.find({
      _id: { $in: user?.saved_item_ids },
    })
    res.json({ saved_items })
  } catch (err) {
    res.json(err)
  }
})

router.get('/:id/purchased-items', async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id })
    const purchased_items = await VendorModel.find({
      _id: { $in: user?.purchased_item_ids },
    })
    res.json({ purchased_items })
  } catch (err) {
    res.json(err)
  }
})

export default router
