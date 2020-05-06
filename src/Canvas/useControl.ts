import { useCallback, useEffect, RefObject } from 'react'
import { useSpring, config } from '@react-spring/core'
import { useGesture } from 'react-use-gesture'

type Props={
  xBounds: [number, number];
  yBounds: [number, number];
  zBounds: [number, number];
  domTarget: RefObject<EventTarget>;
}

export const useControl = ({ xBounds, yBounds, zBounds, domTarget }: Props) => {
  const [{ x, y, z }, set] = useSpring<{x: number;y: number;z: number}>(() => ({ x: 0, y: 0, z: 5, config: config.slow }))
  const zoom = useCallback<Parameters<typeof useGesture>[0]['onWheel']>(({ wheeling, previous, memo = z.getValue() }) => {
    if (wheeling) {
      const newZ = memo + dow
      return newZ
    }
  }, [zBounds, z, set])
  const drag = useCallback(
    ({ xy: [, cy], previous: [, py], memo = y.getValue() }) => {
      const newY = Math.min(Math.max(memo + cy - py, Math.min(...bounds)), Math.max(...bounds))
      set({ y: newY })
      return newY
    },
    [bounds, y, set]
  )
  const bind = useGesture({ onWheel: zoom, onDrag: drag }, { domTarget })
  useEffect(() => domTarget && bind(), [{ domTarget }, bind])
  return [{ x, y, z }, bind]
}
