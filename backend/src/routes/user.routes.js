import express from 'express'
import * as controller from '../controllers/user.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

// Obter todos os utilizadores (apenas superUser)
router.get('/', protect(['superUser']), controller.getAllUsers)

// Obter utilizador específico (apenas superUser)
router.get('/:id', protect(['superUser']), controller.getUserById)

// Criar novo utilizador (superUser e admin)
router.post('/', protect(['superUser', 'admin']), controller.createUser)

// Atualizar utilizador (apenas superUser)
router.put('/:id', protect(['superUser']), controller.updateUser)

// Remover utilizador (apenas superUser)
router.delete('/:id', protect(['superUser']), controller.deleteUser)

// Alterar password (utilizador autenticado)
router.put(
  '/reset-password/:id',
  protect(['superUser', 'admin', 'funcionario']),
  controller.resetPassword
)

export default router
