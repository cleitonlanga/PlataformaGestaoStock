import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'segredo',
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login', error });
  }
});

export default router;
