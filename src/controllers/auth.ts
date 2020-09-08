import { Response, Request } from 'express'
import { RequestB } from '../types'

export const auth = (req: RequestB, res: Response): void => {
    res.send(
        '' +
            '<form method="POST">' +
            '<input type="email" name="email" value="admin@a.com"/>' +
            '<input type="password" name="password" value="password"/>' +
            '<button type="submit">Submit</button>' +
            '</form>',
    )
}

export const signIn = (req: RequestB, res: Response): void => {
    const { email, password } = req.body

    if (email && password && email === 'admin@a.com' && password === 'password') {
        req.session = { loggedIn: true }
        res.status(201).redirect('/')
    } else {
        res.send('Invalid credentials')
    }
}

export const signOut = (req: Request, res: Response): void => {
    if (req.session) {
        req.session.loggedIn = null
        res.redirect('/')
    } else {
        res.redirect('/')
    }
}
