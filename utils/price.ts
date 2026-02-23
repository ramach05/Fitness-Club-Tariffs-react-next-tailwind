/**
 * Вычисляет процент скидки: (1 - price/full_price) * 100 с округлением до целого.
 * @param price — цена со скидкой (в рублях)
 * @param fullPrice — полная цена до скидки (в рублях); при <= 0 возвращается 0
 * @returns процент скидки (0–100) или 0 при невалидном fullPrice
 */
export const getDiscountPercent = (price: number, fullPrice: number): number => {
  if (fullPrice <= 0) return 0;
  return Math.round((1 - price / fullPrice) * 100);
};

/**
 * Форматирует число как цену в рублях с разделителями тысяч (локаль ru-RU).
 * @param value — сумма в рублях
 * @returns строка вида "1 990 Р"
 */
export const formatPrice = (value: number): string =>
  `${value.toLocaleString("ru-RU")} Р`;
