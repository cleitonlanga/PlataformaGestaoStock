import * as supplierService from '../services/supplier.service.js';

// Criar fornecedor
export const createSupplier = async (req, res) => {
  try {
    const supplier = await supplierService.createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar fornecedor', error: error.message });
  }
};

// Listar todos os fornecedores
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar fornecedores', error: error.message });
  }
};

// Obter um fornecedor por ID
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await supplierService.getSupplierById(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Fornecedor não encontrado' });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar fornecedor', error: error.message });
  }
};

// Atualizar fornecedor
export const updateSupplier = async (req, res) => {
  try {
    const updated = await supplierService.updateSupplier(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Fornecedor não encontrado' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar fornecedor', error: error.message });
  }
};

// Remover fornecedor
export const deleteSupplier = async (req, res) => {
  try {
    const deleted = await supplierService.deleteSupplier(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Fornecedor não encontrado' });
    res.status(200).json({ message: 'Fornecedor removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover fornecedor', error: error.message });
  }
};
