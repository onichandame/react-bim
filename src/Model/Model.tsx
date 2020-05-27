import 'three'
import React, { FC, ComponentProps } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

type Props = {
  status: 'normal' | 'error' | 'disconnect'
  src:
    | string
    | {
        normal: string
        error: string
        default?: string
      }
} & ComponentProps<'primitive'>

export const Model: FC<Props> = ({ status, src, object, ...other }: Props) => {
  let normal, error, def
  if (typeof src === 'string') {
    normal = error = def = src
  } else {
    normal = src.normal
    error = src.error
    def = src.default
  }
  const gltf = useLoader(
    GLTFLoader,
    status === 'normal' ? normal : (status === 'error' ? error : def) || ''
  )
  return <primitive object={gltf.scene} dispose={null} {...other} />
}
