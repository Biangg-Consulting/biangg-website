export const getYearsSinceCreation = (createdAt?: string) => {
  const currentYear = new Date().getFullYear();
  const createdYear = createdAt
    ? new Date(createdAt).getFullYear()
    : currentYear;

  const years: string[] = [];
  for (let year = createdYear; year <= currentYear; year++) {
    years.push(year.toString());
  }

  return years;
};
