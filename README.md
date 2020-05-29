# React BIM

A helper library that provides 3D BIM component based on react-three-fiber. May be merged into epics-components in the future. Beware of the peer deps.

# Author

[onichandame](https://github.com/onichandame)

# Usage

```typescript
import React, { FC, useState } from 'react'
import { Canvas, useModel } from 'react-bim'

const App: FC = () => {
  const Model = useModel('/models/default.gltf')
  const [ status, setStatus ] = useState<'normal'|'error'|'disconnect'>()
  return (
    <Canvas>
      <Model
        src={{
          normal: '/normal.glb',
          error: '/error.glb',
          disconnect: '/disconnect.glb'
        }}
        status=
      />
    </Canvas>
  )
}
```
