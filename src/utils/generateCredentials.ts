export const generateEmail = (game: string): string => {
  const letters = game.replace(/[^a-zA-Z]/g, '').toLowerCase(); // Remove espaços e números
  const shuffled = letters.split('').sort(() => 0.5 - Math.random()).join(''); // Embaralha as letras
  const gamePart = shuffled.slice(0, 4); // Pega até 4 caracteres aleatórios
  const randomNumber = Math.floor(100 + Math.random() * 900); // Número de 3 dígitos

  return `konggamesofc+${gamePart}${randomNumber}@gmail.com`;
};


export const generatePsnCredentials = (game: string): { psnPassword: string; psnUser: string } => {
  const gamePart = game.replace(/\s+/g, '').toLowerCase().slice(0, 5); // Limita o nome do jogo a 5 caracteres
  const randomPasswordNumber = Math.floor(10 + Math.random() * 90); // Número de 2 dígitos
  const randomUserNumber = Math.floor(100 + Math.random() * 900); // Número de 3 dígitos

  const psnPassword = `${gamePart}${randomPasswordNumber}`.slice(0, 8); // Garante máximo de 8 caracteres
  const psnUser = `${gamePart}${randomUserNumber}`.slice(0, 8); // Garante máximo de 8 caracteres

  return { psnPassword, psnUser };
};

