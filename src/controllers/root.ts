import { Request, Response } from 'express'

export const rootDir = (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
            <div>
            <div>You are logged in</div>
            <a href="/auth/signout">Logout</a>
            </div>
        `)
    } else {
        res.send(`
            <div>
            <div>Please, sign in</div>
            <a href="/auth">Sign in</a>
            </div>
        `)
    }
}
