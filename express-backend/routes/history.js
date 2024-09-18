const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/authMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

// Get history for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  const history = await prisma.history.findMany({
    where: { userId: req.user.userId }
  });
  res.json(history);
});

module.exports = router;
