const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();  
const prisma = new PrismaClient();
const PORT = process.env.PORT;
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/authMiddleware');
const jwt = require('jsonwebtoken');

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const calculateJumlah = (koefisien, harga, ppn) =>{
  const hargaAwal = koefisien * harga;
  const pajak = hargaAwal * (ppn/100);
  return hargaAwal + pajak;
};

BigInt.prototype.toJSON = function () {
  return this.toString();
};

// Use CORS
app.use(cors({
origin: "http://localhost:3000"
}));

app.use(express.json());

// Use auth routes
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

// POST Anggaran
app.post('/anggarans', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("User ID: ",userId);

    // Get the Anggaran data from the request body
    const { kodeRekening, uraian, koefisien, satuan, harga, ppn } = req.body;
    const jumlah = calculateJumlah(koefisien,harga,ppn)

    // Create a new Anggaran and associate it with the user
    const newAnggaran = await prisma.anggaran.create({
      data: {
        kodeRekening,
        uraian,
        koefisien,
        satuan,
        harga,
        ppn,
        jumlah,
        userId: userId  // Pass the userId here
      },
    });

    // Log history of the created anggaran
    await prisma.history.create({
      data: {
        anggaranId: newAnggaran.id,
        userId: userId,
        action: 'added',
        details: `Anggaran with uraian "${uraian}" was added.`
      }
    });

    res.json(newAnggaran);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ error: 'Failed to create anggaran' });
  }
});


//PUT or UPDATE Anggaran Edit to History
app.put('/anggarans/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Anggaran ID: ", id);

    const { kodeRekening, uraian, koefisien, satuan, harga, ppn } = req.body;
    const jumlah = calculateJumlah(koefisien, harga, ppn);

    // Fetch the current anggaran record to get the userId
    const anggaranRecord = await prisma.anggaran.findUnique({
      where: { id: parseInt(id) }
    });

    if (!anggaranRecord) {
      return res.status(404).json({ error: 'Anggaran not found' });
    }

    const originalUserId = anggaranRecord.userId; // This is the userId from the anggaran table
    console.log("Anggaran originally created by userId: ", originalUserId);

    // Perform the update
    const updatedAnggaran = await prisma.anggaran.update({
      where: { id: parseInt(id) },
      data: { kodeRekening, uraian, koefisien, satuan, harga, ppn, jumlah }
    });

    const currentUserId = req.user.userId; // User performing the update
    console.log("Anggaran edited by userId: ", currentUserId);

    // Log history of the edited anggaran
    await prisma.history.create({
      data: {
        anggaranId: updatedAnggaran.id,
        userId: currentUserId,
        action: 'edited',
        details: `Anggaran with uraian "${uraian}" was edited. Originally created by userId ${originalUserId}.`
      }
    });

    res.json(updatedAnggaran);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ error: 'Failed to update anggaran' });
  }
});


//DELETE Anggaran and Noted in History
app.delete('/anggarans/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Check if the anggaran exists
    const anggaran = await prisma.anggaran.findUnique({
      where: { id: parseInt(id) },
    });

    if (!anggaran) {
      return res.status(404).json({ error: 'Anggaran not found' });
    }

    // Perform the soft delete by updating the deletedAt field
    const softDeletedAnggaran = await prisma.anggaran.update({
      where: { id: parseInt(id) },
      data: { deletedAt: new Date() },
    });

    // Log history of the soft-deleted anggaran
    await prisma.history.create({
      data: {
        anggaranId: softDeletedAnggaran.id,
        userId: userId,
        action: 'deleted',
        details: `Anggaran with uraian "${softDeletedAnggaran.uraian}" was soft deleted.`,
      },
    });

    res.json({ message: `Anggaran with id ${id} was soft deleted successfully` });
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ error: 'Failed to soft delete anggaran' });
  }
});