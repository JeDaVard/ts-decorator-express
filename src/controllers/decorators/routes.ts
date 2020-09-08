import 'reflect-metadata'
import { MetadataKeys, Methods } from '../../types'
import { RequestHandler } from 'express'

interface RouteHandlerDescriptor extends PropertyDescriptor {
    value?: RequestHandler
}

export function routerBinder(method: string) {
    return function (path: string) {
        return function (target: any, key: string, desc: RouteHandlerDescriptor) {
            Reflect.defineMetadata(MetadataKeys.PATH, path, target, key)
            Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key)
        }
    }
}

export const get = routerBinder(Methods.GET)
export const post = routerBinder(Methods.POST)
