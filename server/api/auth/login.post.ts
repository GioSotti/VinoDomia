import { prisma } from '../../utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_token';

export default defineEventHandler(async (event) => {
    const {email, password} = await readBody(event);

    const user = await prisma.user.findUnique({
        where: {email: email}
    });

    if (!user) {
        return {statusCode: 401, body: {success: false, message: 'Invalid email or password'}};
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return {statusCode: 401, body: {success: false, message: 'Invalid email or password'}};
    }

    const token = jwt.sign(
        {id: user.id, email: user.email},
        JWT_SECRET,
        {expiresIn: '24h'}
    );

    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Login successful',
            token
        }
    };
});