export const clamp = (num: number, ...boundary: [number, number]): number =>
  Math.min(Math.max(Math.min(...boundary), num), Math.max(...boundary))
