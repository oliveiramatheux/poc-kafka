import { Router } from 'express'
import { CompressionTypes } from 'kafkajs'

const router = Router()

router.post('/', async (req, res) => {
  const message = {
    user: { id: 1, name: 'Matheus' },
    course: 'Kafka com Node.js',
    grade: 10
  }

  // Chamar micro serviço
  await req.producer.send({
    topic: 'issue-certificate',
    compression: CompressionTypes.GZIP,
    messages: [
      { value: JSON.stringify(message) },
      { value: JSON.stringify({ ...message, user: { ...message.user, name: 'Pellizzetti' } }) }
    ]
  })

  return res.json({ ok: true })
})

export default router
