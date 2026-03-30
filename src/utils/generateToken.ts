import jwt from 'jsonwebtoken'
import { User } from '../entities/User'
import 'dotenv/config'

export function generateToken(user: User): string {
    const secretKey = process.env.JWT_KEY as string
    const token = jwt.sign({id: user.id, username: user.username}, secretKey, {expiresIn: '1h'})
    return token
}