import * as React from 'react'

export interface ReactElementProps {
  name: string
}

export const ReactElement = (props: ReactElementProps) => {
  return (
        <div>REACT IS FICO {props.name}!</div>
  )
}
