import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import { AppRouter } from './AppRouter'
import './controllers/decorators/auth'

import { router, authRouter } from './routes'

const app = express()
const port: any = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cookieSession({ keys: ['someABC...'] }))

app.use(router)
app.use(AppRouter.getInstance())
app.use('/v1/auth', authRouter)

app.listen(port, () => {
    console.log('Server is up and running on ' + port + ' ...')
})
