import express from 'express'
import Stripe from 'stripe'
import * as dotenv from 'dotenv'
import { UserModel, ProductModel } from '../../db/models'
import { ProductType } from '../../db/models/Product'

const router = express.Router()

dotenv.config()
const stripe_key = process.env.STRIPE_KEY
const stripe = new Stripe(stripe_key!, {
  apiVersion: '2022-11-15',
})

type ProductDataType = {
  price_data: {
    currency: string
    product_data: {
      name: string
    }
    unit_amount: number
  }
  quantity: number
}

const getProductData = async (items: { id: string; quantity: number }[]) => {
  const products: ProductDataType[] = []

  for (let i = 0; i < items.length; i++) {
    const product = await ProductModel.findById(items[i].id)
    if (product) {
      const product_data = {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price,
        },
        quantity: items[i].quantity,
      }
      products.push(product_data)
    }
  }

  return products
}

router.post('/', async (req, res) => {
  const items: { id: string; quantity: number }[] = req.body.items
  const products = await getProductData(items)

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: products,
      success_url: `${process.env.SERVER_URL}checkout-complete`,
      cancel_url: `${process.env.SERVER_URL}checkout-cancelled`,
    })
    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

export default router
