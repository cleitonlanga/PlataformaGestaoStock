import Sale from '../models/sales.model.js';
import Product from '../models/product.model.js';

export const createSale = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Estoque insuficiente.' });
    }

    const totalPrice = product.price * quantity;

    // Atualiza o stock
    product.stock -= quantity;
    await product.save();

    const sale = new Sale({ productId, quantity, totalPrice });
    await sale.save();

    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('productId');
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('productId');
    if (!sale) return res.status(404).json({ message: 'Venda não encontrada.' });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Venda não encontrada.' });
    res.json({ message: 'Venda eliminada com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSalesReport = async (req, res) => {
  try {
    const sales = await Sale.find().populate("productId");

    const totalRevenue = sales.reduce((acc, s) => acc + s.totalPrice, 0);

    const productMap = {};
    for (let s of sales) {
      const pid = s.productId._id.toString();
      if (!productMap[pid]) {
        productMap[pid] = { name: s.productId.name, quantity: 0 };
      }
      productMap[pid].quantity += s.quantity;
    }

    const topProducts = Object.values(productMap).sort((a, b) => b.quantity - a.quantity);

    res.json({ sales, totalRevenue, topProducts });
  } catch (err) {
    res.status(500).json({ message: "Erro ao gerar relatório" });
  }
};