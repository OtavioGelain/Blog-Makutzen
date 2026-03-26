import bcrypt from 'bcrypt'

export async function hashedpassword(password: string): Promise<string>{
    const saltsRounds = 10
    return await bcrypt.hash(password, saltsRounds)
}