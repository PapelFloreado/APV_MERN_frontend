import React from 'react'
import{ Outlet } from "react-router-dom"

const authLayout = () => {

  return (
    <>
        <main className='container mx-auto md:grid md:grid-cols-2 gap-12 p-5 mt-12 items-center'>
            <Outlet/>    
        </main>
    </>
  )
}

export default authLayout