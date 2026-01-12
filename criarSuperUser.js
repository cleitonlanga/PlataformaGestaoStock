import mongoose from 'mongoose';
import User from './backend/src/models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const user = new User({
    name: 'Super Utilizador',
    username: 'superadmin',
    password: 'superseguro123',
    role: 'superUser',
  });

  await user.save();
  console.log('✅ SuperUser criado com sucesso!');
  process.exit();
});
