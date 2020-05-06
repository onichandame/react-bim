import React, { FC, ComponentProps } from 'react'
import { animated } from '@react-spring/three'
import { Canvas as R3FC } from 'react-three-fiber'

export const Canvas: FC = ({ children }: ComponentProps<FC>) => {
  return (
    <R3FC camera={{
      isPerspectiveCamera: true,
      position: [0, 0, 4],
      fov: 75,
      near: 0.1,
      far: 1000
    }}>
      <animated.div />
      <ambientLight />
      <pointLight position={[-10, 10, 10]}/>
      <pointLight position={[10, 10, 10]}/>
      {children}
    </R3FC>
  )
}
