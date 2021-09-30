import React from 'react'
import '../../index.css'

const Wrapper = ({children}) => {

  return (
    <div className = "contenedor"  >
      {children}
    </div>
  )
}

export default Wrapper;