export const generateEmail = (game: string): string => {
  const letters = game.replace(/[^a-zA-Z]/g, '').toLowerCase(); // Remove espaços e números
  const shuffled = letters.split('').sort(() => 0.5 - Math.random()).join(''); // Embaralha as letras
  const gamePart = shuffled.slice(0, 4); // Pega até 4 caracteres aleatórios
  const randomNumber = Math.floor(100 + Math.random() * 900); // Número de 3 dígitos

  return `konggamesofc+${gamePart}${randomNumber}@gmail.com`;
};


export const generatePsnCredentials = (game: string): { psnPassword: string; psnUser: string } => {
  const gamePart = game.replace(/\s+/g, '').toLowerCase();
  const randomPasswordNumber = Math.floor(100 + Math.random() * 900);
  const randomUserNumber = Math.floor(1000 + Math.random() * 9000);
  const psnPassword = `${gamePart}-${randomPasswordNumber}`;
  const psnUser = `${gamePart}-${randomUserNumber}`;
  return { psnPassword, psnUser };
};
