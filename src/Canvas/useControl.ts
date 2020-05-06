import { useCallback, useEffect } from 'react'
import { useSpring, config } from '@react-spring/core'
import { useGesture } from 'react-use-gesture'

export const useControl = (bounds: [number, number], props) => {
  const [{ y }, set] = useSpring(() => ({ y: 0, config: config.slow }))
  const fn = useCallback(
    ({ xy: [, cy], previous: [, py], memo = y.getValue() }) => {
      const newY = Math.min(Math.max(memo + cy - py, Math.min(...bounds)), Math.max(...bounds))
      set({ y: newY })
      return newY
    },
    [bounds, y, set]
  )
  const bind = useGesture({ onWheel: fn, onDrag: fn }, props)
  useEffect(() => props && props.domTarget && bind(), [props, bind])
  return [y, bind]
}
