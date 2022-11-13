import React,{useEffect} from 'react'
import {useParams} from "react-router-dom"
import clienteAxios from '../../config/axiosConfig'
import Alerta from "../components/Alerta"
import { useState } from 'react'
import { Link } from 'react-router-dom'



const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [loading, setLoading] = useState(true)
  const [alerta, setAlerta] = useState({})
  const params = useParams()
  const {token} = params


  useEffect(() => {
    const confirmarCuenta = async()=>{
    
    
    try {
      const url = `veterinarios/confirmar/${token}`
      const {data} = await clienteAxios(url)
      setCuentaConfirmada(true)
      setAlerta({msg: data.msg , error: false})
      
    } catch (error) {
      setAlerta({msg: error.response.data.msg, error:true})
      console.log(error.response)
    }

      setLoading(false)
    }

    confirmarCuenta()
  }, [])
  

 

  return (
    <>
        
        <div>
          <h1 className='text-indigo-600 text-5xl font-extrabold'>Crea tu Cuenta y Administra <span className="text-black">tus Pacientes</span></h1>
        </div>
      <div className='mt-20 md:mt-5 rounded-xl bg-white shadow-lg py-10 px-5'>
        {
          !loading && <Alerta alerta={alerta}/>
        }

        {
          cuentaConfirmada && <Link className='text-center text-gray-500 my-5' to="/">Inicia Sesión.</Link>
        }
      </div>
    </>
  )
}

export default ConfirmarCuenta