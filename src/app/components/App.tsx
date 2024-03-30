import React from 'react'

import { Viz } from './Viz'
import { Viz2 } from './Viz2'

export const App = () => {
  return (
    <div className='h-screen bg-black flex flex-col'>
      <p className='text-white'>Content</p>
      {/* <Viz /> */}
      <Viz2 />
    </div>
  )
}
