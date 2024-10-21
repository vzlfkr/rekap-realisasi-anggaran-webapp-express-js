const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();
const secret_key = process.env.JWT_SECRET;
const authenticateToken = require('../middleware/authMiddleware');


// Register route
router.post('/register', async (req, res) => {
  const { fullName, email, password, nip } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: { fullName, email, password: hashedPassword, nip }
    });

    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) return res.status(401).json({ error: 'Invalid email or password' });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) return res.status(401).json({ error: 'Invalid email or password' });

  const expirationTime = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
  const token = jwt.sign({ userId: user.id }, secret_key, { expiresIn: expirationTime / 1000 });

  const expirationDate = Date.now() + expirationTime; // Expiration in server time
  console.log("expiration date is ", expirationDate)

  // Send the token and expiration time to the frontend
  res.json({ token, expiresAt: expirationDate });
});

// GET the current user's profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Get userId from the token
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        fullName: true,
        email: true,
        nip: true,
        imageUrl: true // Assuming you added this field to the User model
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user); // Send the user data back to the frontend
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});


module.exports = router;
