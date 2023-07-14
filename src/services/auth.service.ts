import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';
import HttpException from '../utils/http-exception';
import generateToken from '../utils/generateToken.utils';
// import { User } from '../types/users';

const checkUserUniqueness = async (email: string) => {
  const existingUserByEmail = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (existingUserByEmail) {
    throw new HttpException(422, {
      errors: { ...(existingUserByEmail ? { email: ['has already been taken'] } : {})}
    });
  }
};

// Get all users
export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            email: true,
            name: true,
            role: true,
        },
    });
    if (!users) {
        throw new HttpException(404, "Users not found");
    }

    return users;
}

// Create a new user
export const createUser = async (input: any) => {
    const email = input.email
    const name = input.name
    const password = input.password
    const role_id = input.role_id
    
    if (!email) {
        throw new HttpException(422, { errors: { email: ["can't be blank"] } });
    }
    if (!name) {
        throw new HttpException(422, { errors: { name: ["can't be blank"] } });
    }
    if (!password) {
        throw new HttpException(422, { errors: { password: ["can't be blank"] } });
    }
    if (!role_id) {
        throw new HttpException(422, { errors: { role_id: ["can't be blank"] } });
    }

    await checkUserUniqueness(email);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role_id
        },
        select: {
            email: true,
            name: true,
            role: true,
        },
    });

    return { ...user };
};

export const login = async (userPayload: any) => {
  const email = userPayload.email
  const password = userPayload.password

  if (!email) {
    throw new HttpException(422, { errors: { email: ["can't be blank"] } });
  }

  if (!password) {
    throw new HttpException(422, { errors: { password: ["can't be blank"] } });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      name: true,
      password: true,
      role: true,
    },
  });

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return {
        email: user.email,
        name: user.name,
        role: user.role,
        token: generateToken(user),
      };
    }
  }

  throw new HttpException(403, {
    errors: {
      'email or password': ['is invalid'],
    },
  });
};