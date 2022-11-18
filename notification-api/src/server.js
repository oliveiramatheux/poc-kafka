import express from 'express'
import router from './routes/index.js'
import cors from 'cors'
import { Kafka, logLevel } from 'kafkajs'

const server = express()
server.use(express.json())
server.use(cors())

const kafka = new Kafka({
  clientId: 'api',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10
  }
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'certificate-group-receiver' })

server.use((req, _res, next) => {
  req.producer = producer
  return next()
})

server.use('/api', router)

async function kafkaSetup () {
  await producer.connect()
  await consumer.connect()

  await consumer.subscribe({ topic: 'certification-response' })

  await consumer.run({
    eachMessage: async ({ _topic, _partition, message }) => {
      console.log('Resposta', String(message.value))
    }
  })
}

await kafkaSetup().catch(console.error)

export default server
