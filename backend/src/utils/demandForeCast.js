import Sale from "../models/sales.model.js";

/**
 * Previsão de demanda com média móvel simples
 * @param {string} productId - ID do produto
 * @param {number} days - Número de dias para a média
 * @returns {Promise<number>} - Quantidade prevista
 */
export async function forecastDemand(productId, days = 7) {
  const now = new Date();
  const pastDate = new Date();
  pastDate.setDate(now.getDate() - days);

  const sales = await Sale.find({
    productId,
    date: { $gte: pastDate, $lte: now },
  });

  if (!sales.length) return 0;

  const totalSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);
  const average = totalSold / days;

  return Math.ceil(average); // Arredonda para cima
}
