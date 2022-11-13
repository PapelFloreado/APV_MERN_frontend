import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import useAuth from '../hooks/useProvider'

const RutaProtegida = () => {

    const {auth, cargando} = useAuth()


    if(cargando) return "cargando..."

  return (
    <>
        <Header/>
            <main className='container mx-auto py-10'>
                {auth?._id ? <Outlet/> : <Navigate to="/" /> }
            </main>
        <Footer/>
        
    </>
  )
}

export default RutaProtegida