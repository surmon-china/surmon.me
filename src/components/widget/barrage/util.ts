
export const randomPer = (pre = 3) => {
  const step1 = new Date().getTime() * 9301 + 49297
  const step2 = (step1 % 233280) / 233280.0
  return step2 * pre + Math.random()
}
