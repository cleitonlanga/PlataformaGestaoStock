import Supplier from "../models/supplier.models.js";

export const createSupplier = async (supplierData) => {
  const supplier = new Supplier(supplierData);
  return await supplier.save();
}

export const getAllSuppliers = async () => {
  return await Supplier.find();
}

export const getSupplierById = async (id) => {
  return await Supplier.findById(id);
}

export const updateSupplier = async (id, supplierData) => {
  return await Supplier.findByIdAndUpdate(id, supplierData, { new: true });
}

export const deleteSupplier = async (id) => {
  return await Supplier.findByIdAndDelete(id);
}

