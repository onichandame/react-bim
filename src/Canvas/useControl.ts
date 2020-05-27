import { useCallback, useEffect, RefObject } from 'react'
import { useSpring, SpringValue, config } from '@react-spring/core'
import { useGesture } from 'react-use-gesture'

import { clamp } from '../utils'

type Props = [
  [number, number],
  [number, number],
  [number, number],
  { domTarget?: EventTarget | RefObject<EventTarget> | undefined }
]

// scroll:
//  up: zoom in
//  down: zoom out
//
// left drag: move
//
// right drag: rotate

export const useControl = (
  ...[xBounds, yBounds, zBounds, { domTarget }]: Props
): [
  { x: SpringValue<number>; y: SpringValue<number>; z: SpringValue<number> },
  ReturnType<typeof useGesture>
] => {
  const [{ x }, setX] = useSpring<{ x: number }>(() => ({
    x: 0,
    config: config.slow,
  }))
  const [{ y }, setY] = useSpring<{ y: number }>(() => ({
    y: 5,
    config: config.slow,
  }))
  const [{ z }, setZ] = useSpring<{ z: number }>(() => ({
    z: 5,
    config: config.slow,
  }))
  const zoom = useCallback(
    ({ wheeling, xy: [, newY], previous: [, oldY], memo = z.get() }) => {
      if (wheeling) {
        const newZ = clamp(memo + newY - oldY, ...zBounds)
        setZ({ z: newZ })
        return newZ
      } else {
        return memo
      }
    },
    [zBounds, z, setZ]
  )
  const drag = useCallback(
    ({
      buttons,
      dragging,
      offset: [newX, newY],
      memo = [x.get(), y.get()],
    }) => {
      if (dragging && buttons == 2) {
        setX({ x: newX })
        setY({ y: -newY })
        return [newX, newY]
      }
      return memo
    },
    [xBounds, yBounds, x, y, setX, setY]
  )
  const bind = useGesture({ onWheel: zoom, onDrag: drag }, { domTarget })
  useEffect(() => {
    domTarget && bind()
  }, [domTarget, bind])
  return [{ x, y, z }, bind]
}
