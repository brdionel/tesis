import React, { useState } from 'react';

const ingresosBase = [{
  fecha: "17/09/2021",
  hora: "21:30",
  nombre: "Bruno",
  apellido: "Vicente",
  temperatura: '37',
  estrecho: "No",
  sintomas: "No",
  firma: "Si"
}]

const Contexto = React.createContext([])

export function ProveedorContextoIngresos({ children }){
  const [ingresos, setIngresos] = useState(ingresosBase)
  return <Contexto.Provider value={ {ingresos, setIngresos} }>
    {children}
  </Contexto.Provider>
}

export default Contexto;

