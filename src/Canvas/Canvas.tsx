import React, { FC, useRef, useEffect, ComponentProps } from 'react'
import { Canvas as RCanvas } from 'react-three-fiber'

import { Scene } from './Scene'

type Props = ComponentProps<typeof RCanvas>

export const Canvas: FC<Props> = ({
  children,
  camera = {
    isPerspectiveCamera: true,
    position: [0, 0, 10],
    fov: 55,
    near: 0.01,
    far: 1000,
  },
  ...other
}) => {
  const canvas = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    // prevents opening context menu on right click
    canvas &&
      canvas.current &&
      canvas.current.addEventListener('contextmenu', e => e.preventDefault())
  }, [])
  return (
    <div ref={canvas}>
      <RCanvas concurrent camera={camera} {...other}>
        <Scene>{children}</Scene>
      </RCanvas>
    </div>
  )
}
