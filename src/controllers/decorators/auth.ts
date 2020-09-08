import { get, post } from './routes'
import { use } from './middleware'
import { controller } from './controller'
import { RequestB } from '../../types'
import { NextFunction, Request, Response } from 'express'
import { validator } from './validators'

const makeSureUsersNotLoggedIn = (req: RequestB, res: Response, next: NextFunction) => {
    if (req.session && req.session.loggedIn) {
        throw new Error('You are already logged in')
    }
    next()
}
const logger = (req: RequestB, res: Response, next: NextFunction) => {
    console.log(`[${new Date(Date.now()).toLocaleDateString()}] New request...`)
    console.log(req.body)
    next()
}

@controller('/auth')
class AuthController {
    @get('/')
    @use(logger)
    auth(req: RequestB, res: Response): void {
        res.send(
            '' +
                '<form method="POST">' +
                '<input type="email" name="email" value="admin@a.com"/>' +
                '<input type="password" name="password" value="password"/>' +
                '<button type="submit">Submit</button>' +
                '</form>',
        )
    }

    @post('/')
    @use(makeSureUsersNotLoggedIn)
    @validator('email', 'password')
    signIn(req: RequestB, res: Response): void {
        const { email, password } = req.body

        if (email === 'admin@a.com' && password === 'password') {
            req.session = { loggedIn: true }
            res.status(201).redirect('/')
        } else {
            res.send('Invalid credentials')
        }
    }

    @get('/signout')
    signOut(req: Request, res: Response): void {
        if (req.session) {
            req.session.loggedIn = null
            res.redirect('/')
        } else {
            res.redirect('/')
        }
    }
}
