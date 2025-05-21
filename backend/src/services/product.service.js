import Product from '../models/product.model.js';

export const getAll = () => Product.find();

export const getById = (id) => Product.findById(id);

export const create = (data) => Product.create(data);

export const update = (id, data) => Product.findByIdAndUpdate(id, data, { new: true });

export const remove = (id) => Product.findByIdAndDelete(id);
