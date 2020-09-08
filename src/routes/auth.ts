import { NextFunction, Response, Router } from 'express'
import { authController } from '../controllers'
import { RequestB } from '../types'

const router = Router()

router.get('/', authController.auth)

const isValid = (req: RequestB, res: Response, next: NextFunction) => {
    if (req.body) {
        if (req.body.password && req.body.password.length < 8) res.send('Short password!')
    }
    next()
}

router.post('/', isValid, authController.signIn)

router.get('/signout', authController.signOut)

export { router }
