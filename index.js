const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

// Import routes
const authRoutes = require('./routes/auth');
const anggaranRoutes = require('./routes/anggaran');
const historyRoutes = require('./routes/history');

BigInt.prototype.toJSON = function () {
  return this.toString();
};

app.use(express.json());

// Use routes
app.use('/auth', authRoutes);

//GET Anggaran
app.get('/anggarans', async (req, res) => {
  try {
    const anggarans = await prisma.anggaran.findMany();
    res.json(anggarans);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

//POST Anggaran
app.post('/anggarans', async (req, res) => {
  try {
    const { kodeRekening, uraian, koefisien, satuan, harga, ppn, jumlah, userId } = req.body;
    
    const newAnggaran = await prisma.anggaran.create({
      data: {
        kodeRekening,
        uraian,
        koefisien,
        satuan,
        harga,
        ppn,
        jumlah,
        userId,
      },
    });
    
    res.json(newAnggaran);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ error: 'Failed to create anggaran' });
  }
});

app.use('/history', historyRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
