'use client';
export const GeneratedDataRegistration = (name: string) => {
  const firstFourLetters = name.slice(0, 4).toLowerCase();
  return {
    email: `${firstFourLetters}@gmail.com`,
    psnPassword: `${firstFourLetters}@kong`,
    psnUser: `${firstFourLetters}-kong`,
  };
};
