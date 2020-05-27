import 'three'
import React, { FC, ComponentProps } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

type Props = {
  src: string
} & ComponentProps<'primitive'>

export const Model: FC<Props> = ({ src, object, ...other }: Props) => {
  const gltf = useLoader(GLTFLoader, src)
  return <primitive object={gltf.scene} dispose={null} {...other} />
}
