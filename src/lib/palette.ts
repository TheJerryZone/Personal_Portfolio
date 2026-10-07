// A controlled two-color duo — blue and red — cycled by index across tags,
// category labels and project numbers, so color reads as one deliberate
// system rather than a scattered rainbow.
export const palette = ['#3654FF', '#E8362C'] as const

export function colorAt(index: number) {
  return palette[index % palette.length]
}
