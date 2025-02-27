const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get company details
router.get('/api/company', auth, async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        organizerId: req.user.id
      }
    });
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ success: true, company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create company
router.post('/api/company', auth, async (req, res) => {
  try {
    const {
      name,
      description,
      location,
      email,
      industry,
      mission,
      benefits,
      position,
      occupiedPositions
    } = req.body;

    const company = await prisma.company.create({
      data: {
        name,
        description,
        location,
        email,
        industry,
        mission,
        benefits,
        position,
        occupiedPositions: parseInt(occupiedPositions),
        organizer: {
          connect: { id: req.user.id }
        }
      }
    });

    res.json({ success: true, company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}); 