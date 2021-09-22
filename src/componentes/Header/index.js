import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../index.css'
import Wrapper from '../Wrapper'
import usuario from '../../icon-usuario.png';

export default function Header() {
  let location = useLocation();
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className="header">
      <Wrapper>
        <div className="header__contenedor">
          {
            location.pathname !== '/'
            ? <Link to="/" className="estilosLink">
                <h1 className="header__titulo">Protocolo COVID-19</h1>
              </Link>
            : <h1 className="header__titulo">Protocolo COVID-19</h1>
          }
          {
            showMenu &&
            <div className="header__menu">
              <img src={usuario} alt="Usuario" />
              <p title="Login como Administrador">Admin</p>
            </div>
          }
        </div>
      </Wrapper>
    </div>
  )
}
