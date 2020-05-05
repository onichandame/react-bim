import React, { FC, ComponentProps } from 'react'
import { Canvas as R3FC } from 'react-three-fiber'

const Canvas: FC = ({ children }: ComponentProps<FC>) => {
  return (
    <R3FC camera={{
      isPerspectiveCamera: true,
      fov: 75,
      near: 0.1,
      far: 1000
    }}>
      {children}
    </R3FC>
  )
}

export default Canvas
