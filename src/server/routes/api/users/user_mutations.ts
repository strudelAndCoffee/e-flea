import express from 'express'
import { UserModel } from '../../../db/models'
import { withAuth } from '../../../utils/auth'

const router = express.Router()

router.put('/:id/add-order', withAuth, async (req, res) => {
  const order_id = req.body.order_id

  try {
    const user = await UserModel.findById(req.params.id)
    if (!user) res.status(400).json({ message: 'No user found with that ID.' })
    if (user) {
      user.past_orders.push(order_id)
      await user.save()
    }

    res.json({ user })
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

export default router
