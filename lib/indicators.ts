// ⭐ Simple Moving Average
export function SMA(data: any[], length: number) {
  const result = []
  for (let i = 0; i < data.length; i++) {
    if (i < length) {
      result.push({ time: data[i].time, value: null })
      continue
    }
    const slice = data.slice(i - length, i)
    const avg =
      slice.reduce((sum, c) => sum + c.close, 0) / length
    result.push({ time: data[i].time, value: avg })
  }
  return result
}

// ⭐ Exponential Moving Average
export function EMA(data: any[], length: number) {
  const result = []
  const k = 2 / (length + 1)
  let prev = data[0].close

  for (let i = 0; i < data.length; i++) {
    const price = data[i].close
    const ema = price * k + prev * (1 - k)
    prev = ema
    result.push({ time: data[i].time, value: ema })
  }

  return result
}
