export const formatPrice = (value: string | number) => {
  const numericValue = Number(value.toString().replace(/\D/g, '')) / 100;
  return numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};
