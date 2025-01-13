export const formatCPF = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");
  const limitedValue = cleanedValue.slice(0, 11);
  const formattedCPF = limitedValue
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");

  return formattedCPF;
};
