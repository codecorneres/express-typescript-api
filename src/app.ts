import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.get('/roles', async (req: Request, res: Response) => {
  try {
    const roles = await prisma.user.findMany();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post('/roles', async (req: Request, res: Response) => {
  // Create new role
});

app.get('/roles/{id}', async (req: Request, res: Response) => {
  // get role  by id
});

app.put('/roles/{id}', async (req: Request, res: Response) => {
  // update role  by id
});
app.delete('/roles/{id}', async (req: Request, res: Response) => {
  // delete role  by id
});

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

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
