import { Router } from 'express'
import { mainController } from '../controllers'

const router = Router()

router.get('/', mainController.rootDir)

export { router }
