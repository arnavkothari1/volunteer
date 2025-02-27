const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/api/internships', auth, async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { organizerId: req.user.id }
    });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const {
      title,
      description,
      location,
      isRemote,
      requirements,
      status = 'OPEN'
    } = req.body;

    const internship = await prisma.internship.create({
      data: {
        title,
        description,
        location,
        isRemote: Boolean(isRemote),
        requirements,
        status,
        company: {
          connect: { id: company.id }
        }
      }
    });

    res.json({ success: true, internship });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get company's internships
router.get('/api/internships/company', auth, async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { organizerId: req.user.id },
      include: {
        internships: {
          include: {
            applications: true
          }
        }
      }
    });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json({ success: true, internships: company.internships });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}); 