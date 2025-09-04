export function getInitials(name: string): string {
  const nameParts = name.trim().split(/\s+/);

  if (nameParts.length < 2) {
    return nameParts.join("")[0];
  }
  const firstInitial = nameParts[0][0];
  const lastInitial = nameParts[nameParts.length - 1][0];

  return `${firstInitial}${lastInitial}`.toUpperCase();
}
