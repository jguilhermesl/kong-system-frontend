export const formatPoints = (points: string | number): number => {
  const numericPoints =
    typeof points === 'string' ? parseFloat(points) : points;
  return Math.floor(numericPoints);
};
