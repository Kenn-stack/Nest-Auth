import * as crypto from 'crypto'

export function genToken(length:number, encoding: BufferEncoding){
    return crypto.randomBytes(length).toString(encoding)
}