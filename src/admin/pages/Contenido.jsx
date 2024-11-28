import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import NavbarAdmin from '../components/NavbarAdmin'

export const Contenido = () => {

  return (
    <div className="flex flex-row">
      <NavbarAdmin />
      <Sidebar />
    </div>
  )

}

export default Contenido