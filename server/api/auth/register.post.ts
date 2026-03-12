import {prisma} from '../../utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_token';

export default defineEventHandler(async (event) => {
    const {email, password, name} = await readBody(event);

    const user = await prisma.user.findUnique({
        where: {email: email}
    });

    if (user) {
        return {statusCode: 401, body: {success: false, message: 'User already exists'}};
    }

    await prisma.user.create({
        data: {
            email: email,
            password: await bcrypt.hash(password, 10),
            name: name,
            role: 0,
        }
    })
    const createdUser = await prisma.user.findUnique({
        where: {email: email},
    });

    if (createdUser == null) {
        return {statusCode: 401, body: {success: false, message: 'User creation failed'}};
    }


    try {
        const token = jwt.sign(
            {id: createdUser.id, email: createdUser.email},
            JWT_SECRET,
            {expiresIn: '24h'}
        );
        return {
            statusCode: 200,
            body: {
                success: true,
                message: 'Register successful',
                token
            }
        };
    } catch (error) {
        console.error('Error generating token:', error);
        return {
            statusCode: 500,
            body: {
                success: false,
                message: 'Internal server error',
            }
        };
    }
});

