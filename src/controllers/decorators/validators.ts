import 'reflect-metadata'
import { MetadataKeys } from '../../types'

export function validator(...keys: string[]) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        Reflect.defineMetadata(MetadataKeys.VALIDATOR, keys, target, key)
    }
}
