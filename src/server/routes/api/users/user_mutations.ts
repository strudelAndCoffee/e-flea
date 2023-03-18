import express from 'express'
import { UserModel } from '../../../db/models'
import { withAuth } from '../../../utils/auth'

const router = express.Router()

// Add order by user ID
router.put('/:id/add-order', withAuth, async (req, res) => {
  const user_id = req.params.user_id
  const order_id = req.body.order_id

  const user = await UserModel.findById(user_id)
  if (!user) res.status(400).json({ message: 'No user found with that ID.' })

  try {
    user?.past_orders.push(order_id)
    const response = await user?.save()
    res.json(response)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

// Update user by ID
router.put('/:id', withAuth, async (req, res) => {
  const query = { _id: req.params.id }
  const update = { ...req.body.update_fields }

  try {
    const updated_user = await UserModel.findOneAndUpdate(query, update)
    res.json(updated_user)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Delete user by ID
router.delete('/:id', withAuth, async (req, res) => {
  const user_id = req.params.id

  try {
    const response = await UserModel.findByIdAndDelete(user_id)
    res.json(response)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
