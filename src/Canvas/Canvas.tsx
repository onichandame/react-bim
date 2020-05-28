import React, { FC, useRef, useEffect, ComponentProps } from 'react'
import { a } from '@react-spring/three'
import { Canvas as RCanvas } from 'react-three-fiber'

import { Scene } from './Scene'
import { useControl } from './useControl'

export const Canvas: FC = ({ children, ...other }: ComponentProps<FC>) => {
  const bound: [number, number] = [-200, 200]
  const [{ x, y, z }] = useControl(bound, bound, bound, { domTarget: window })
  const canvas = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    // prevents opening context menu on right click
    canvas &&
      canvas.current &&
      canvas.current.addEventListener('contextmenu', e => e.preventDefault())
    // registers the camera
  }, [])
  return (
    <div ref={canvas}>
      <RCanvas
        concurrent
        invalidateFrameloop
        camera={{
          isPerspectiveCamera: true,
          position: [0, 0, 10],
          fov: 55,
          near: 0.01,
          far: 1000,
        }}
        {...other}
      >
        <Scene>
          <a.group
            rotation-x={y.interpolate(y => -(y / 500) * 10)}
            rotation-y={x.interpolate(x => (x / 500) * 10)}
            position-z={z.interpolate(z => (z / 500) * 25)}
          >
            {children}
          </a.group>
        </Scene>
      </RCanvas>
    </div>
  )
}
