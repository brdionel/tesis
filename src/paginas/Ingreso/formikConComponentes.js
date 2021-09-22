import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../../index.css'

const initialValues = {
  nombre: '',
  apellido: ''
}

export default function Ingreso() {
  
  const [register, setRegister] = useState(false)
  
  if(register) return <h2>Excelente! Has sido registrado .</h2>

  return (
    <Formik
      initialValues = {initialValues}
      onSubmit = {(values, {setFieldError}) => {
        setTimeout(() => {
          console.log(values)
          if(!register){
            setFieldError('nombre', 'Este nombre no es válido')
            setFieldError('apellido', 'Este apellido no es válido')
          }
        }, 3000)
      }}
    >
    
      {
        ({isSubmitting, errors, touched}) => <Form>
          <Field className={errors.nombre ? 'errors' : ''} name="nombre" type="text" />
          <ErrorMessage className="form-error" name="nombre" component="small"/>
          <Field name="apellido" type="text"/>
          <ErrorMessage className="form-error" name="apellido" component="small"/>
          <button disabled = {isSubmitting}>Continuar</button>
          
        </Form>
      }

    </Formik>
  )
}