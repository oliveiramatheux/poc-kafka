import { Router } from 'express'
import notificationRouter from './notification.js'

const router = Router()

router.use('/notification', notificationRouter)

export default router
