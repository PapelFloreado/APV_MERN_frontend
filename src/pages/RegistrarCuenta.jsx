import React, {useState} from 'react'
import { Link } from "react-router-dom"
import clienteAxios from '../../config/axiosConfig'
import Alerta from '../components/Alerta'


const RegistrarCuenta = () => {
    
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repetirPassword, setRepetirPassword] = useState("")

    const [alerta, setAlerta] = useState({})
    
    const handleOnSubmit = async(e)=>{
      e.preventDefault()

      if([nombre, email, password, repetirPassword].includes("")){
        setAlerta({ msg: "Todos los campos son obligatorios", error: true})        
        return
      }
      if(password !== repetirPassword){
        setAlerta({ msg: "Los passwords deben coincidir", error: true})
        return
      }
      if(password.length < 6){
        setAlerta({ msg: "El password es muy corto, agrega 6 o más cáracteres", error: true})
        return
      }

      // Enviar a la API el USER

      try {
          await clienteAxios.post("/veterinarios",{nombre, email, password})
          setAlerta({msg: "Cuenta creada correctamente", error: false})
      } catch (error) {
          setAlerta({msg:error.response.data.msg, error:true})
      }
    }
    
    const {msg} = alerta


  return (
    <>

        <div>
          <h1 className='text-indigo-600 text-5xl font-extrabold'>Crea tu Cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
        </div>
      <div className='mt-20 md:mt-5 rounded-xl bg-white shadow-lg py-10 px-5'>
        {msg && <Alerta alerta={alerta}/>}
         <form onSubmit={handleOnSubmit}  action="">
                <div className='my-5'>
                    <label className='block uppercase text-gray-600 font-bold'>Nombre</label>
                    <input className='border rounded-xl w-full p-3 mt-3'  type="text" name="" value={nombre} onChange={e=>setNombre(e.target.value)} id="nombre" placeholder='Tu Nombre' />
                </div>
                <div className='my-5'>
                    <label className='block uppercase text-gray-600 font-bold'>Email</label>
                    <input className='border rounded-xl w-full p-3 mt-3' type="email" name=""  value={email} onChange={e=>setEmail(e.target.value)} id="email" placeholder='Tu Email' />
                </div>
                <div className='my-5'>
                  <label className='block uppercase text-gray-600 font-bold'>Password</label>
                    <input className='border rounded-xl w-full p-3 mt-3' type="password" name=""  value={password} onChange={e=>setPassword(e.target.value)} id="password" placeholder='Tu Password' />
                </div>
                <div className='my-5'>
                    <label className='block uppercase text-gray-600 font-bold'>Repetir Password</label>
                    <input className='border rounded-xl w-full p-3 mt-3' type="password" name=""  value={repetirPassword} onChange={e=>setRepetirPassword(e.target.value)} id="repitepassword" placeholder='Repite Tu Password' />
                </div>
                <input className=' bg-indigo-700 w-full md:w-auto rounded-lg uppercase text-white hover:cursor-pointer hover:bg-indigo-900 py-3 px-10 transition-colors duration-300 mt-5 font-bold' type="submit" value="Crea tu Cuenta" />
            </form>
            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link className='text-center text-gray-500 my-5' to="/">¿Tienes una cuenta? Inicia Sesión.</Link>
                <Link className='text-center text-gray-500 my-5' to="/olvide-password">Olvide mi Password</Link>
            </nav>
      </div>
    </>
  )
}

export default RegistrarCuenta