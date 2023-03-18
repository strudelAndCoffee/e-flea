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

export default router
