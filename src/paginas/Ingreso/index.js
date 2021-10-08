/* eslint no-use-before-define: 0 */
import React, { useState, useContext } from 'react'
import moment from 'moment';
import '../../index.css'
import { Formik, Form, Field, useField } from 'formik';
import * as Yup from 'yup'
import './ingreso.css'
import Wrapper from '../../componentes/Wrapper'
import ContextoIngresos from '../../contextos/ingresos'
import IngresoItem from '../../componentes/IngresoItem'

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMet()]
  // which we can spread on <input> and alse replace ErrorMessage entirely
  const [field, meta] = useField(props)
  return (
    <>
      <label className="label_selectGroup" htmlFor={props.id || props.name}>{label}</label>
      <input className={meta.touched && meta.error? "input_error": null} {...field} {...props}/>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const MyCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" })
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox"/>
        {children}
      </label>
      {meta.touched && meta.error? (
        <div className="error">{meta.error}</div>
      ) :null}
    </>
  )
}

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};


export default function Ingreso() {
  
  const {ingresos, setIngresos} = useContext(ContextoIngresos)
  
  const initialValues = {
    fecha: moment().format('L'),
    hora: moment().format('LT'),
    nombre: '',
    apellido: '',
    temperatura: '',
    estrecho: '',
    sintomas: false,
    firma: false, 
    grupoPersona: '',
    emailEmpresa: "",
    sector: "",
    proveedorEmpresa: "",
    clienteEmpresa: "",
    motivoVisita: ""
  }

  return (
    <Wrapper>
      <div className="layout">
      <div className="ingreso_container">
        <div className="form_container">
          <Formik
            initialValues = {initialValues}
            validationSchema={Yup.object({
              nombre: Yup.string()
                .max(30, "El nombre debe contener 30 caracteres o menos")
                .min(3, "El nombre debe contener mas de 3 caracteres")
                .required("Requerido"),
              apellido: Yup.string()
                .max(30, "El apellido debe contener 40 caracteres o menos")
                .required("Requerido"),
              // grupoPersona: Yup.string()
              //   .required("Requerido"),
              temperatura: Yup.string()
                .required("Requerido"),
              firma: Yup.boolean()
                .required("Requrido")
                .oneOf([true], "Debes aceptar las condiciones para ingresar."),
              grupoPersona: Yup.string()
                .required("Requrido")
                .oneOf(["empleado", "proveedor", "cliente", "visita"], "Debes seleccionar uno")
            })}
            onSubmit = {async (values, { setSubmitting, resetForm }) => {
              await new Promise(r => setTimeout(r, 1500))
              alert(JSON.stringify(values, null, 2));
              resetForm({ values: '' })
              setIngresos(prevState => prevState.concat(values))
            }}
          >
            {({ isSubmitting, resetForm, values }) => (
              <Form>
                <fieldset className="form-fieldset">
                  { console.log('***values: ', values)}
                  <legend>Usuario Registrado</legend>
                  <div className="contiene_inputs">
                    <MyTextInput
                      label="Fecha "
                      name="fecha"
                      type="text"
                      disabled 
                    />
                  </div>
                  <div className="contiene_inputs">
                    <MyTextInput
                      label="Hora "
                      name="hora"
                      type="text"
                      disabled
                      className="campo"  
                    />
                  </div>
                  <div className="contiene_inputs">
                    <MyTextInput
                      label="Nombre "
                      name="nombre"
                      type="text"
                      className="campo"  
                    />
                  </div>
                  <div className="contiene_inputs">
                    <MyTextInput
                      label="Apellido "
                      name="apellido"
                      type="text"
                    />
                  </div>
                  <div className="contenedor_dinamico">
                    <div className="select_grupoPersona">
                    <MySelect label="¿A qué grupo pertenece?" name="grupoPersona" >
                      <option value="">Elegir</option>
                      <option value="empleado">Empleado</option>
                      <option value="proveedor">Proveedor</option>
                      <option value="cliente">Cliente</option>
                      <option value="visita">Visita</option>
                    </MySelect>
                    </div>
                    <div className="inputsGrupoPeronas">
                      {
                        values.grupoPersona === 'empleado' && <>
                          <div className="inputsGrupoPeronas_emplado">
                            <MyTextInput
                              label="Email de Autoneum "
                              name="emailEmpresa"
                              type="text"
                              className="campo"  
                            />
                            <MyTextInput
                              label="Sector:  "
                              name="sector"
                              type="text"
                              className="campo"  
                            />
                          </div>
                        </>
                      }
                      {
                        values.grupoPersona === 'proveedor' && <>
                        <div className="inputsGrupoPeronas_proveedor">
                          <MyTextInput
                            label="Empresa"
                            name="proveedorEmpresa"
                            type="text"
                            className="campo"  
                          />
                        </div>
                      </>
                      }
                      {
                        values.grupoPersona === 'cliente' && <>
                        <div className="inputsGrupoPeronas_cliente">
                          <MyTextInput
                            label="Empresa"
                            name="clienteEmpresa"
                            type="text"
                            className="campo"  
                          />
                        </div>
                      </>
                      }
                      {
                        values.grupoPersona === 'visita' && <>
                        <div className="inputsGrupoPeronas_visita">
                          <MyTextInput
                            label="Motivo de la visita"
                            name="motivoVisita"
                            type="text"
                            className="campo"  
                          />
                        </div>
                      </>
                      }
                    </div>
                  </div>
                  <div className="contiene_inputs">
                    <MyTextInput
                      label="Temperatura "
                      name="temperatura"
                      type="text"
                      className="campo"  
                    />
                  </div>
                  <div className="radio-group">
                  <div id="my-radio-group">Es contacto estrecho de un paciente COVID positivo?</div>
                  <div role="group" aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="estrecho" value="Si" />
                      Si
                    </label>
                    <label>
                      <Field type="radio" name="estrecho" value="No" />
                      No
                    </label>
                  </div>
                  </div>
                  <div className="radio-group">
                    <div id="my-radio-group">Tiene algún síntoma compatible con los de COVID-19?</div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" name="sintomas" value="Si" />
                        Si
                      </label>
                      <label>
                        <Field type="radio" name="sintomas" value="No" />
                        No
                      </label>
                    </div>
                  </div>
                  <div className="contiene_inputs">
                    <MyCheckBox name="firma" className="campo"  >
                      Firma
                    </MyCheckBox>
                  </div>
                  <div>
                    <button type="submit" disabled={isSubmitting}> Ingresar </button>
                    <button type="reset" onClick={resetForm}> Limpiar </button>                 
                  </div>
                </fieldset>  
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div>
            <h1 className="titleIngresos">Ingresos</h1>
          {
            ingresos.map(ingreso => 
              <IngresoItem key={`${ingreso.fecha}${ingreso.hora}`} {...ingreso} />
            )
          }
      </div>
      </div>
    {/* <hr/>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>DNI</th>
        </tr>
      </thead>
      <tbody>
        {console.log('ingresos en table')}
        {console.log(ingresos)}
        {ingresos && ingresos.map(ingreso => (
            <tr>
              <td>{ingreso.fecha}</td>
              <td>{ingreso.hora}</td>
              <td>{ingreso.nombre}</td>
              <td>{ingreso.apellido}</td>
              <td>{ingreso.dni}</td>
            </tr>
        ))
        }
      </tbody>
    </Table> */}
    
    </Wrapper>
  )
}