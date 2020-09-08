import { Request } from 'express'

export interface RequestB extends Request {
    body: { [key: string]: string | undefined }
}

export enum Methods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
}

export enum MetadataKeys {
    PATH = 'path',
    METHOD = 'method',
    MIDDLEWARE = 'middleware',
}
