import express from 'express'
import { UserModel, VendorModel } from '../../db/models'
import { withAuth } from '../../utils/auth'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({})
    if (!users) res.status(400).json({ message: 'No users found.' })
    res.json({ users })
  } catch (err) {
    res.json(err)
  }
})

router.get('/:id', withAuth, async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id })
    if (!user) res.status(400).json({ message: 'No user found with that ID.' })
    res.json({ user })
  } catch (err) {
    res.json(err)
  }
})

router.get('/:id/owned-vendors', withAuth, async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id })
    if (!user) res.status(400).json({ message: 'No user found with that ID.' })

    const owned_vendors = await VendorModel.find({
      _id: { $in: user?.owned_vendor_ids },
    })
    res.json({ owned_vendors })
  } catch (err) {
    res.json(err)
  }
})

router.get('/:id/favorite-vendors', withAuth, async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id })
    if (!user) res.status(400).json({ message: 'No user found with that ID.' })

    const favorite_vendors = await VendorModel.find({
      _id: { $in: user?.favorite_vendor_ids },
    })
    res.json({ favorite_vendors })
  } catch (err) {
    res.json(err)
  }
})

router.get('/:id/saved-items', withAuth, async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id })
    if (!user) res.status(400).json({ message: 'No user found with that ID.' })

    const saved_items = await VendorModel.find({
      _id: { $in: user?.saved_item_ids },
    })
    res.json({ saved_items })
  } catch (err) {
    res.json(err)
  }
})

router.get('/:id/past-orders', withAuth, async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id })
    if (!user) res.status(400).json({ message: 'No user found with that ID.' })

    const past_orders = user?.past_orders ?? []
    res.json({ past_orders })
  } catch (err) {
    res.json(err)
  }
})

router.put('/:id/add-order', withAuth, async (req, res) => {
  const query = { _id: req.params.id }
  const order = req.body.order
  try {
    const user = await UserModel.findById(req.params.id)
    if (!user) res.status(400).json({ message: 'No user found with that ID.' })
    if (user) {
      user.past_orders.push(order)
      user.save()
    }

    res.json({ user })
    // const updated_user = await UserModel.findOneAndUpdate(
    //   query,
    //   {
    //     $push: { past_orders: { order } },
    //   },
    //   {
    //     upsert: true,
    //   }
    // )
    // if (!updated_user)
    //   res.status(400).json({ message: 'No user found with that ID.' })

    // res.json({ updated_user })
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

export default router
