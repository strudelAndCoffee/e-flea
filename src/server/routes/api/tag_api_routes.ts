import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('all tags')
})
router.get('/:id', (req, res) => {
  const id = req.params.id
  res.send({ data: id })
})

export default router