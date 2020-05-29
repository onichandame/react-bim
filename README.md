# React BIM

A helper library that provides 3D BIM component based on react-three-fiber. May be merged into epics-components in the future. Beware of the peer deps.

# Author

[onichandame](https://github.com/onichandame)

# Usage

```typescript
import React, { FC, useState, useEffect } from 'react'
import { Canvas, Model } from 'react-bim'

const App: FC = () => {
  const [ status, setStatus ] = useState<'normal'|'error'>()
  useEffect(() => setInterval(() => setStatus(status === 'normal' ? 'error' : 'normal'), 1000), [])
  return (
    <Canvas>
      <Model
        src={{
          normal: '/normal.glb',
          error: '/error.glb'
        }}
        status={status}
      />
    </Canvas>
  )
}
```
