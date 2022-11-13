import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import clienteAxios from '../../config/axiosConfig'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useProvider'


const Login = () => {

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ alerta, setAlerta ] = useState({})
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const handleOnSubmit = async(e)=>{
    e.preventDefault()
    
    if([password, email].includes("")){
      setAlerta({msg: "Todos los campos son obligatorios", error: true})
      return
    }

      try {
        const {data} = await clienteAxios.post("/veterinarios/login", {email, password})
        localStorage.setItem("token", data.token)
        setAuth(data)
        navigate("/admin")
      } catch (error) {
        setAlerta({msg: error.response.data.msg, error:true})
      }
  }

  
  const { msg } = alerta

  return (
    <>
        <div>
          <h1 className='text-indigo-600 text-5xl font-extrabold'>Inicia Sesión y Administra tus <span className="text-black">Pacientes</span></h1>
        </div>
        <div>
            <form onSubmit={handleOnSubmit} className='mt-20 md:mt-5 rounded-xl bg-white shadow-lg py-10 px-5' action="">
          {
            msg && <Alerta alerta={alerta}/>
          }
                <div className='my-5'>
                    <label className='block uppercase text-gray-600 font-bold'>Email</label>
                    <input onChange={e=>setEmail(e.target.value)} className='border rounded-xl w-full p-3 mt-3' type="email" name="" id="email" placeholder='Tu Email' />
                </div>
                <div className='my-5'>
                    <label className='block uppercase text-gray-600 font-bold'>Password</label>
                    <input onChange={e=>setPassword(e.target.value)} className='border rounded-xl w-full p-3 mt-3' type="password" name="" id="password" placeholder='Tu Password' />
                </div>
                <input className=' bg-indigo-700 w-full md:w-auto rounded-lg uppercase text-white hover:cursor-pointer hover:bg-indigo-900 py-3 px-10 transition-colors duration-300 mt-5 font-bold' type="submit" value="Iniciar Sesión" />
            </form>
            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link className='text-center text-gray-500 my-5' to="/registrar">¿No tienes una cuenta? Regístrate.</Link>
                <Link className='text-center text-gray-500 my-5' to="/olvide-password">Olvide mi Password</Link>
            </nav>
        </div>
    </>
  )
}

export default Login