export const formatPrice = (value: string | number) => {
  const isFormatted = typeof value === 'string' && value.startsWith('R$');
  const formattedValue = isFormatted
    ? value.toString()
    : Number(value).toFixed(2);

  const numericValue =
    Number(formattedValue.toString().replace(/\D/g, '')) / 100;

  return numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};
