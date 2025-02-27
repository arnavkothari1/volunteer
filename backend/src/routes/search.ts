import { Router } from 'express';
import { prisma } from '../lib/db';

const router = Router();

router.get('/internships/search', async (req, res) => {
  try {
    const { search, remote } = req.query;

    const internships = await prisma.internship.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: search as string, mode: 'insensitive' } },
              { description: { contains: search as string, mode: 'insensitive' } }
            ]
          },
          remote === 'true' ? { isRemote: true } : {}
        ],
        status: 'OPEN'
      },
      include: {
        company: true
      }
    });

    res.json(internships);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search internships' });
  }
});

export default router; 