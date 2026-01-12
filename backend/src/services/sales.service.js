import Sale from "../models/sales.model.js";
import Product from "../models/product.model.js";

const updateProductStock = async (productId, quantity) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    if (product.stock < quantity) {
        throw new Error("Not enough stock");
    }
    product.stock -= quantity;
    await product.save();
    return product;
}

export const createSale = async (data) => {
    const { productId, quantity } = data;

    const product = await updateProductStock(productId, quantity);
    const totalPrice = product.price * quantity;
    const sale = new Sale({ productId, quantity, totalPrice });
    await sale.save();
    return sale;
}

export const getAllSales = () => {
    return Sale.find().populate('productId');
}

export const getSaleById = (id) => {
    return Sale.findById(id).populate('productId');
}

export const deleteSale = (id) => {
    return Sale.findByIdAndDelete(id);
}

export const getSalesReport = async () => {
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

    return { sales, totalRevenue, topProducts };
} 