const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();
const secret_key = process.env.JWT_SECRET;

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

  const token = jwt.sign({ userId: user.id }, secret_key, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
