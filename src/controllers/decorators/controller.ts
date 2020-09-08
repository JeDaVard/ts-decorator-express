import 'reflect-metadata'
import { AppRouter } from '../../AppRouter'
import { MetadataKeys, Methods } from '../../types'
import { RequestHandler, Response, Request, NextFunction } from 'express'

function bodyValidators(keys: string): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.body) {
            res.status(422).send('Invalid request')
            return
        }
        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send('Missing property ' + key)
                return
            }
        }
        next()
    }
}

export function controller(routPrefix: string) {
    return function (target: Function) {
        const router = AppRouter.getInstance()

        for (let key in target.prototype) {
            const routeHandler = target.prototype[key]
            const path = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key)
            const method: Methods = Reflect.getMetadata(MetadataKeys.METHOD, target.prototype, key)
            const middlewares = Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) || []
            const requiredBodyFields = Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) || []
            const validators = bodyValidators(requiredBodyFields)

            if (path) {
                router[method](`${routPrefix}${path}`, ...middlewares, validators, routeHandler)
            }
        }
    }
}
