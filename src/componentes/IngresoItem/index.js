import React from 'react'
import './IngresoItem.css'

export default function index({nombre, apellido, fecha, hora, temperatura, sintomas, estrecho, grupoPersona, ...props}) {
  return (
    <div className="ingresoItemContainer">
      <div className="fecha_hora">
        <span className="fecha">{fecha}</span>
        <span className="hora">{hora}</span>
      </div>
      <div className="datosPersona">
        <p className="nombre">
          {`${nombre} ${apellido} - ${grupoPersona.toUpperCase()}`}
        </p>
        <p className="temperatura">{`Temperatura: ${temperatura}°`}</p>
        <p className="sintomas">{`Sintomas: ${sintomas} - Contacto Estrecho: ${estrecho} `}</p>
      </div>
    </div>
  )
}
