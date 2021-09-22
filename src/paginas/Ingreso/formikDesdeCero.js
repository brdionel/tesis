import React from 'react'
import { Formik } from 'formik';
import '../../index.css'

export default function Ingreso() {
  return (
    <Formik
      initialValues = {{
        nombre: '',
        apellido: ''
      }}
      onSubmit = {(values, {setFieldError}) => {
        setTimeout(() => {
          console.log(values)
          setFieldError('nombre', 'Este nombre no es válido')
          setFieldError('apellido', 'Este apellido no es válido')
        }, 3000)
      }}
    >
    
      {
        ({handleSubmit, handleChange, isSubmitting, errors, touched}) => <form onSubmit = {handleSubmit}>
          <input className={errors.nombre ? 'errors' : ''} name="nombre" type="text" onChange={handleChange}/>
          {<small className="form-error">{errors.nombre?  <p>{errors.nombre}</p> :  ''}</small>}
          <input name="apellido" type="text" onChange={handleChange}/>
          {<small className="form-error">{errors.nombre?  <p>{errors.apellido}</p> :  ''}</small>}
          <button disabled = {isSubmitting}>Continuar</button>
          
        </form>
      }

    </Formik>
  )
}