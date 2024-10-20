const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();  
const prisma = new PrismaClient();
const PORT = process.env.PORT;
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Import routes
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/authMiddleware');
const jwt = require('jsonwebtoken');

// Check if the uploads folder exists, if not, create it
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Uploads folder created.');
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


function calculateJumlah(koefisien, harga, ppn) {
  const total = koefisien * harga;
  const totalWithPpn = total + (total * ppn / 100);
  return parseFloat(totalWithPpn); // Return as float
}


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

// GET Anggaran
app.get('/anggarans', async (req, res) => {
  try {
    const anggarans = await prisma.anggaran.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' }, // Order by newest first
    });
    res.json(anggarans);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// index.js or any file where routes are defined
app.get('/history', async (req, res) => {
  try {
    const histories = await prisma.history.findMany({
      orderBy: {
        timestamp: 'desc', // Most recent first
      },
    });
    res.json(histories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history data' });
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
        details: `Anggaran dengan uraian "${uraian}" berhasil ditambah.`
      }
    });

    res.json(newAnggaran);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ error: 'Failed to create anggaran' });
  }
});

// GET anggaran by ID
app.get('/anggarans/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Anggaran ID Fetch: ", id)
    const anggaran = await prisma.anggaran.findUnique({
      where: { id: parseInt(id) },
    });

    if (!anggaran) {
      return res.status(404).json({ error: 'Anggaran not found' });
    }

    res.json(anggaran);
  } catch (error) {
    console.error('Error fetching anggaran:', error);
    res.status(500).json({ error: 'Failed to fetch anggaran' });
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
        details: `Anggaran dengan uraian "${uraian}" telah di Edit.`
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
        details: `Anggaran dengan uraian "${softDeletedAnggaran.uraian}" telah di Delete.`,
      },
    });

    res.json({ message: `Anggaran with id ${id} was soft deleted successfully` });
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ error: 'Failed to soft delete anggaran' });
  }
});

// Profile Image Upload
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Route to update user profile (including image)
app.put('/profile', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fullName, nip, email } = req.body;
    let imageUrl = null;

    // Check if a new image is uploaded
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    // Set NIP to null if it's an empty string or explicitly passed as "null"
    const nipValue = !nip || nip === "null" || nip.trim() === "" ? null : nip;

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        nip: nipValue,  // Ensure that NIP is null if it's empty or "null"
        email,
        imageUrl: imageUrl || undefined, // Only update imageUrl if new image is uploaded
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});



// USE Profile Image
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));