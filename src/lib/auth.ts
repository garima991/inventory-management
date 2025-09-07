import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    email: string;
    role: string;
    username: string;
    tenantId ?: string;
}

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
}

export async function generateToken(payload: TokenPayload): Promise<string> {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    }
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
    try {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error('JWT_SECRET_KEY is not defined in environment variables');
        }
        return jwt.verify(token, process.env.JWT_SECRET_KEY) as TokenPayload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}