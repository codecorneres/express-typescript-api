import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import express, {  NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/routes';
import HttpException from 'utils/http-exception';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'API is running on /api' });
});

app.use((err: Error | HttpException, req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (err && err.errorCode) {
    // @ts-ignore
    res.status(err.errorCode).json(err.message);
  } else if (err) {
    res.status(500).json(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`server up on port ${PORT}`);
});

// const app = express();
// app.use(express.json());

// app.get('/roles', async (req: Request, res: Response) => {
//   try {
//     const roles = await prisma.user.findMany();
//     res.json(roles);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// });

// async function main() {

//   const user = await prisma.user.create({
//     data: {
//       name: "meghan",
//       email: "meghan@gmail.com",
//       password: "passpass",
//     }
//   })
  
//   console.log(user);
// }

// main()
//   .catch((e: Error) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     // Disconnect Prisma Client
//     await prisma.$disconnect()
//   })
// app.post('/roles', async (req: Request, res: Response) => {
//   // Create new role
// });

// app.get('/roles/{id}', async (req: Request, res: Response) => {
//   // get role  by id
// });

// app.put('/roles/{id}', async (req: Request, res: Response) => {
//   // update role  by id
// });
// app.delete('/roles/{id}', async (req: Request, res: Response) => {
//   // delete role  by id
// });

// app.get('/users', async (req: Request, res: Response) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.post('/users', async (req: Request, res: Response) => {
//   try {
//     const { name, email } = req.body;
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//       },
//       include: {
//         role: true
//       }
//     });
//     res.json(user);
//     //user.role.name
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });
