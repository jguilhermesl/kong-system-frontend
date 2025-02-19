
export const generateEmail = (game: string): string => {
  const letters = game.replace(/[^a-zA-Z]/g, '').toLowerCase(); // Remove espaços e números
  const shuffled = letters.split('').sort(() => 0.5 - Math.random()).join(''); // Embaralha as letras
  const gamePart = shuffled.slice(0, 4); // Pega até 4 caracteres aleatórios
  const randomNumber = Math.floor(100 + Math.random() * 900); // Número de 3 dígitos

  return `konggamesofc+${gamePart}${randomNumber}@gmail.com`;
};

const getRandomElement = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];

export const generatePsnCredentials = (game: string): { psnPassword: string; psnUser: string } => {
  const letters = game.replace(/[^a-zA-Z]/g, '').toLowerCase();

  const passwordLettersCount = 4;
  const passwordDigitsCount = 8 - passwordLettersCount;
  const psnPasswordLetters = letters.slice(0, passwordLettersCount);
  const psnPasswordDigits = Math.floor(Math.random() * Math.pow(10, passwordDigitsCount))
    .toString()
    .padStart(passwordDigitsCount, '0');
  const psnPassword = (psnPasswordLetters + psnPasswordDigits).slice(0, 8);

  const suffixOptions = ["pro", "bra", "mis", "game"];
  const suffix = getRandomElement(suffixOptions);
  const userLettersCount = 4;
  const psnUserLetters = letters.slice(0, userLettersCount);
  const userDigitsCount = 11 - (userLettersCount + suffix.length);
  const psnUserDigits = Math.floor(Math.random() * Math.pow(10, userDigitsCount))
    .toString()
    .padStart(userDigitsCount, '0');
  const psnUser = (psnUserLetters + suffix + psnUserDigits).slice(0, 11);

  return { psnPassword, psnUser };
};

