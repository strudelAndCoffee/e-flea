import Joi, { ObjectSchema } from 'joi'
import { NextFunction, Request, Response } from 'express'
import { IUser } from '../db/models/User'
import { IOrder } from '../db/models/Order'

export default function validateSchema(schema: ObjectSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body)

      next()
    } catch (error) {
      console.error(error)
      return res.status(422).json({ error })
    }
  }
}

export const Schemas = {
  user: {
    create: Joi.object<IUser>({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      dob: Joi.object<Record<string, number>>({
        day: Joi.number().required(),
        month: Joi.number().required(),
        year: Joi.number().required(),
      }),
    }),
    update: Joi.object<IUser>({
      username: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
      orders: Joi.array<string>(),
    }),
  },
  order: {
    create: Joi.object<IOrder>({
      user_id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      items: Joi.array<string>().required(),
      total_cost: Joi.number().required(),
      purchase_date: Joi.number().required(),
    }),
  },
}
