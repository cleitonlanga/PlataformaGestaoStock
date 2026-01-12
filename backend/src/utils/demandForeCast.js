import mongoose from "mongoose";
import Sale from "../models/sales.model.js";

/**
 * Previsão de demanda com média móvel simples.
 * A previsão é calculada somando as vendas de um período e dividindo pelo número de dias.
 *
 * @param {string} productId - ID do produto para a previsão.
 * @param {number} [days=7] - O número de dias passados para incluir na média móvel.
 * @returns {Promise<number>} A quantidade prevista, arredondada para o inteiro superior mais próximo.
 */
export async function forecastDemand(productId, days = 7) {
  // 1. Validação de entrada
  if (!productId) {
    throw new Error("O ID do produto deve ser fornecido.");
  }
  if (!Number.isInteger(days) || days <= 0) {
    throw new Error("O número de dias deve ser um inteiro positivo.");
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Formato de ID do produto inválido.");
  }

  // 2. Definir o intervalo de datas
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  // 3. Usar Agregação do MongoDB para eficiência
  // Isto é mais performático do que buscar todos os documentos e processar no Node.js,
  // pois permite que o banco de dados faça o trabalho pesado.
  const result = await Sale.aggregate([
    {
      $match: {
        productId: new mongoose.Types.ObjectId(productId),
        date: { $gte: startDate, $lte: endDate },
      },
    },
    {
      // Agrupa todos os documentos correspondentes e soma suas quantidades
      $group: {
        _id: null, // Um único grupo para todos os documentos correspondentes
        totalSold: { $sum: "$quantity" },
      },
    },
  ]);

  // 4. Calcular a Previsão
  if (result.length === 0) {
    return 0; // Nenhuma venda no período
  }

  const totalSold = result[0].totalSold;
  const average = totalSold / days;

  // A média representa a demanda prevista para o dia seguinte.
  // Arredondar para cima porque não se pode vender uma fração de um item.
  return Math.ceil(average);
}
