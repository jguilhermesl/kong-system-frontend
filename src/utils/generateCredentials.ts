export const generateEmail = (game: string): string => {
  const gamePart = game.replace(/\s+/g, '').toLowerCase();
  const randomNumber = Math.floor(100 + Math.random() * 900);
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
