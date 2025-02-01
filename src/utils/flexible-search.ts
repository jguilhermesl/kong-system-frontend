export function flexibleSearch(query: string, name: string): boolean {
  if (!query) return false
  if (!name) return false
  // Função para normalizar strings
  const normalize = (text: string): string =>
    text
      .toLowerCase() // Converter para minúsculas
      .replace(/[^a-z0-9\s]/gi, "") // Remover caracteres especiais
      .trim(); // Remover espaços extras

  // Normalizar a query e o nome
  const normalizedQuery = normalize(query);
  const normalizedName = normalize(name);

  // Dividir em palavras
  const queryWords = normalizedQuery.split(/\s+/);
  const nameWords = normalizedName.split(/\s+/);

  // Procurar palavras da query no nome como prefixos em sequência
  let queryIndex = 0;

  for (const word of nameWords) {
    if (word.startsWith(queryWords[queryIndex])) {
      queryIndex++;
    }
    if (queryIndex === queryWords.length) {
      return true; // Todas as palavras da query foram correspondidas como prefixos
    }
  }

  return false; // Não houve correspondência
}
