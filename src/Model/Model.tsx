import 'three'
import React, { Suspense, FC, ComponentProps } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

type Props={
  src: string;
} & ComponentProps<typeof Suspense>

export const Model: FC<Props> = ({ src, ...other }: Props) => {
  const gltf = useLoader(GLTFLoader, src)
  return (
    <Suspense {...other}>
      <primitive object={gltf.scene} dispose={null}/>
    </Suspense>
  )
}
