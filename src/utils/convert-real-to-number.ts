export function convertRealToNumber(brlString: string) {
  const sanitizedString = brlString
    .replace(/[^\d,.-]/g, '')
    .replace('.', '')
    .replace(',', '.');

  const number = parseFloat(sanitizedString);

  return isNaN(number) ? null : number;
}

