import User from '../models/user.model.js'

// Obter todos os utilizadores (apenas superUser)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar utilizadores', error: err })
  }
}

// Obter utilizador específico (apenas superUser)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user)
      return res.status(404).json({ message: 'Utilizador não encontrado' })

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar utilizador', error: err })
  }
}

// Criar novo utilizador (superUser e admin)
export const createUser = async (req, res) => {
  const { name, username, password, role } = req.body

  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: 'Nome de utilizador já existe' })
    }

    const user = new User({ name, username, password, role })
    await user.save()
    res.status(201).json({ message: 'Utilizador criado com sucesso', user })
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar utilizador', error: err })
  }
}

// Atualizar utilizador (apenas superUser)
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user)
      return res.status(404).json({ message: 'Utilizador não encontrado' })

    user.name = req.body.name || user.name
    user.username = req.body.username || user.username
    user.role = req.body.role || user.role

    await user.save()
    res.json({ message: 'Utilizador atualizado com sucesso', user })
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar utilizador', error: err })
  }
}

// Remover utilizador (apenas superUser)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user)
      return res.status(404).json({ message: 'Utilizador não encontrado' })
    res.json({ message: 'Utilizador removido com sucesso' })
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover utilizador', error: err })
  }
}

// Alterar password (utilizador autenticado)
export const resetPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body

  try {
    const user = await User.findById(req.params.id)
    if (!user)
      return res.status(404).json({ message: 'Utilizador não encontrado' })

    const isMatch = await user.matchPassword(currentPassword)
    if (!isMatch)
      return res.status(401).json({ message: 'Password atual incorreta' })

    user.password = newPassword
    await user.save()

    res.json({ message: 'Password alterada com sucesso' })
  } catch (err) {
    res.status(500).json({ message: 'Erro ao alterar password', error: err })
  }
}