import * as productService from '../services/product.service.js';

export const getAll = async (req, res) => {
  const products = await productService.getAll();
  res.json(products);
};

export const getById = async (req, res) => {
  const product = await productService.getById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json(product);
};

export const create = async (req, res) => {
  const product = await productService.create(req.body);
  res.status(201).json(product);
};

export const update = async (req, res) => {
  const product = await productService.update(req.params.id, req.body);
  if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json(product);
};

export const remove = async (req, res) => {
  const product = await productService.remove(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json({ message: 'Removido com sucesso' });
};
