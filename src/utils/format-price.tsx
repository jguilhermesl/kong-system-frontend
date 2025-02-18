export const formatPrice = (value: string | number) => {
  const formattedValue = Number(value).toFixed(2);
  const numericValue =
    Number(formattedValue.toString().replace(/\D/g, '')) / 100;
  return numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};
