import React,{useState} from 'react'
import { Link } from "react-router-dom"
import clienteAxios from '../../config/axiosConfig'
import Alerta from '../components/Alerta'


const OlvidePassword = () => {

    const [email, setEmail] = useState("")
    const [ alerta, setAlerta] = useState({})

    const handleOnSubmit = async(e)=>{
      e.preventDefault()

      if(email === ""){
        setAlerta({msg: "El email es necesario", error: true})
        return
      }

      try {
        const{data} = await clienteAxios.post("/veterinarios/olvide-password", {email})
        setAlerta({msg: data.msg})
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error: true
        })
      }

    }

    const {msg} = alerta

    
  return (
    <>
          <div>
              <h1 className='text-indigo-600 text-5xl font-extrabold'>Recupera tu <span className="text-black">Password</span></h1>
          </div>
          <div>
              <form onSubmit={handleOnSubmit} className='mt-20 md:mt-5 rounded-xl bg-white shadow-lg py-10 px-5' action="">
            {
              msg &&
              <Alerta alerta={alerta}/>
            }
                  <div className='my-5'>
                      <label className='block uppercase text-gray-600 font-bold'>Email</label>
                      <input onChange={e=>setEmail(e.target.value)} className='border rounded-xl w-full p-3 mt-3' type="email" value={email} name="email" id="email" placeholder='Tu Email' />
                  </div>
                  <input className=' bg-indigo-700 w-full md:w-auto rounded-lg uppercase text-white hover:cursor-pointer hover:bg-indigo-900 py-3 px-10 transition-colors duration-300 mt-5 font-bold' type="submit" value="Recuperar Password" />
              </form>
              <nav className='mt-10 lg:flex lg:justify-between'>
                <Link className='text-center text-gray-500 my-5' to="/">¿Tienes una cuenta? Inicia Sesión.</Link>
                <Link className='text-center text-gray-500 my-5' to="/registrar">¿No tienes una cuenta? Regístrate.</Link>
            </nav>
          </div>

    </>
  )
}

export default OlvidePassword