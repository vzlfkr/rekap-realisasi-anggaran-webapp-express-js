const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/authMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

// Get all anggarans for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  const anggarans = await prisma.anggaran.findMany({
    where: { userId: req.user.userId }
  });
  res.json(anggarans);
});

// Create a new anggaran
router.post('/', authenticateToken, async (req, res) => {
  const { kodeRekening, uraian, koefisien, satuan, harga, ppn, jumlah } = req.body;

  const newAnggaran = await prisma.anggaran.create({
    data: {
      kodeRekening,
      uraian,
      koefisien,
      satuan,
      harga,
      ppn,
      jumlah,
      userId: req.user.userId
    }
  });

  res.json(newAnggaran);
});

module.exports = router;
