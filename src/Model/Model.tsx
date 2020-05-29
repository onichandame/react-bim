import 'three'
import React, { FC, ComponentProps } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type CommonProps = ComponentProps<'group'>

type DullProps = {
  src: string
  status?: undefined
} & CommonProps

type InterestingProps = {
  src: {
    [key: string]: string
  }
  status: keyof Props['src']
} & CommonProps
type Props = DullProps | InterestingProps

type Models = {
  key: string
  model: GLTF
}[]

export const Model: FC<Props> = ({ status, src, ...other }: Props) => {
  let model
  if (typeof src === 'string') {
    model = useLoader(GLTFLoader, src)
  } else {
    model = [] as Models
    for (const m in src) {
      model.push({
        key: m,
        model: useLoader(GLTFLoader, src[m]),
      })
    }
  }
  return (
    <group {...other}>
      {Array.isArray(model) ? (
        model.map(({ key, model }) => (
          <primitive
            key={key}
            visible={key === status}
            object={model.scene}
            dispose={null}
          />
        ))
      ) : (
        <primitive visible object={model.scene} dispose={null} />
      )}
    </group>
  )
}
