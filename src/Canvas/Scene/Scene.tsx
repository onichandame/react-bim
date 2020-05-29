import React, { useRef, FC, Suspense } from 'react'
import { OrbitControls, StandardEffects } from 'drei'
import { Group } from 'three'

import { Loading } from './Loading'

export const Scene: FC = ({ children }) => {
  const mesh = useRef<Group>(null)
  return (
    <>
      <Suspense fallback={Loading}>
        <group ref={mesh}>{children}</group>
        <StandardEffects />
        <OrbitControls minZoom={10} maxZoom={1} />
      </Suspense>
    </>
  )
}
