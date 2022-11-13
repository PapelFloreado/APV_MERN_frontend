import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useProvider'

const Header = () => {

    const { cerrarSesion } = useAuth() 


  return (
    <header className='py-10 bg-indigo-600'>
        <div className='container text-center flex flex-col lg:flex-row justify-between items-center mx-auto'>
            <h1 className='text-indigo-200 font-bold text-xl'>Adminsitrador de Pacientes de <span className=' font-extrabold text-white'>Veterinaria</span></h1>
            <nav className='text-white font-bold flex flex-col mt-5 lg:mt-0 lg:flex-row items-center gap-4 uppercase'>
                <Link  to="/admin" >Pacientes</Link>
                <Link  to="/admin/perfil">Perfil</Link>
                <button onClick={cerrarSesion} className='uppercase' type='button'>Cerrar Sesión</button>
            </nav>
        </div>
    </header>
  )
}

export default Header