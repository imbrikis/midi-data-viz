const randNum = (min: number = 0, max: number = 100) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const generatePoints = (
  amount: number,
  min: number = 0,
  max: number = 100
) => {
  const points = []

  for (let x = 0; x < amount; x++) {
    const point = [randNum(min, max), randNum(min, max)]
    points.push(point)
  }

  return points
}

export const generateRandomArray = (
  amount: number,
  min: number = 0,
  max: number = 100
) => {
  const points = []

  for (let x = 0; x < amount; x++) {
    const point = randNum(min, max)
    points.push(point)
  }

  return points
}
