export const extractNumber = (value: string): number => {

  return parseFloat(value.replace('R$', '').trim().replace(',', '.'));
};