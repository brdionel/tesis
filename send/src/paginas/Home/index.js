import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Wrapper from '../../componentes/Wrapper'
import '../../index.css'

export default function Home() {
  
  let history = useHistory();

  const [dni, setDni] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handleSubmit')
    if(/^\d{6,8}(?:[-\s]\d{4})?$/.test(dni) === false) {
      setError(true)
      setTimeout(() => {
        setError(false)
        setDni('')
      }, 4000)
    } else {
      setError(false)
      console.log(history)
      history.push(`/ingreso/${dni}`);
    }
  }

  const handleChange = (e) => {
    setDni(e.target.value)
  }


  return (
    <Wrapper>
      <section className="home__contenedor">
        <h2 className="home__titulo">Ingresa tu DNI, por favor</h2>
        <form className="home__form" onSubmit={ handleSubmit }>
          <input type="text" className="input" id="dni" value={dni} onChange= { handleChange } />
          {
            error &&
            <small className="home__form-small" id="mensaje">El DNI debe contener entre 6 y 8 números</small>
          }
          <div className="home__form-botones">
            <button 
              type="submit" 
              className='home__form-boton'
            >
                Ingresar
            </button>
          </div>
        </form>
      </section>
    </Wrapper>
  )
}
