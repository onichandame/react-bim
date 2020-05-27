import React, { FC, ComponentProps } from 'react'
import { a } from '@react-spring/three'
import { Canvas as R3FC } from 'react-three-fiber'

import { Scene } from './Scene'
import { useControl } from './useControl'

export const Canvas: FC = ({ children, ...other }: ComponentProps<FC>) => {
  const bound: [number, number] = [-100, 100]
  const [{ x, y, z }] = useControl(bound, bound, bound, { domTarget: window })
  return (
    <R3FC
      invalidateFrameloop
      camera={{
        isPerspectiveCamera: true,
        position: [0, 0, 4],
        fov: 55,
        near: 0.01,
        far: 1000,
      }}
      {...other}
    >
      <Scene>
        <a.group
          position-x={x.interpolate(x => (x / 500) * 15)}
          position-y={y.interpolate(x => (x / 500) * 15)}
          position-z={z.interpolate(x => (x / 500) * 25)}
        >
          {children}
        </a.group>
      </Scene>
    </R3FC>
  )
}
