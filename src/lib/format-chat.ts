export function initialsName(name: string): string {
  const initials = name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('')

  return (initials || 'N/A')
}

export function numberFormat(input: string): string {
  const digits = input.replace(/\D/g, "")

  const match = digits.match(/^(\d{2})(\d{3})(\d{3})(\d{3})$/) // 11 dígitos + 1 prefijo

  if (match) {
    const [, country, part1, part2, part3] = match
    return `+${country} ${part1} ${part2} ${part3}`
  }

  // Fallback para 9 dígitos locales
  const localMatch = digits.match(/^(\d{3})(\d{3})(\d{3})$/)

  if (localMatch) {
    const [, part1, part2, part3] = localMatch
    return `${part1} ${part2} ${part3}`
  }

  return input
}