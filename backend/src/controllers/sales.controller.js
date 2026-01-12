import * as saleService from "../services/sales.service.js";

export const createSale = async (req, res) => {
  try {
    const sale = await saleService.createSale(req.body);
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllSales = async (req, res) => {
  try {
    const sales = await saleService.getAllSales();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSaleById = async (req, res) => {
  try {
    const sale = await saleService.getSaleById(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Venda não encontrada.' });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const sale = await saleService.deleteSale(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Venda não encontrada.' });
    res.json({ message: 'Venda eliminada com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSalesReport = async (req, res) => {
  try {
    const sales = await saleService.getSalesReport();
    const { totalRevenue, topProducts } = sales;
    res.json({ sales, totalRevenue, topProducts });
  } catch (err) {
    res.status(500).json({ message: "Erro ao gerar relatório" });
  }
};