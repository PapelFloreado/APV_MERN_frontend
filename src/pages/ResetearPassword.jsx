import React,{useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import clienteAxios from '../../config/axiosConfig'
import Alerta from '../components/Alerta'


const ResetearPassword = () => {

    const params = useParams()
    const { token } = params
    const [ alerta, setAlerta ] = useState({})
    const [ password, setPassword ] = useState("")
    const [ tokenValido, setTokenValido ] = useState(false)
    const [ passwordModificado, setPasswordModificado] = useState(false)

    useEffect(()=>{
        const comprobarToken = async()=>{
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`)
                setAlerta({msg: "Coloca tu nuevo Password", error: false})
                setTokenValido(true)
            } catch (error) {
                setAlerta({msg: "Hubo un error", error: true})
            }
        }
        comprobarToken()
    },[])

    const handleOnSubmit = async(e)=>{
      e.preventDefault()
      if(password.length < 6){
        setAlerta({msg: "El nuevo password es muy corto", error: true})
        return
      }

      try {
          const url = `/veterinarios/olvide-password/${token}`
          const { data } = await clienteAxios.post(url, {password})
          setAlerta({msg: data.msg})

        
      } catch (error) {
        setAlerta({})
      }
    }

    const {msg} = alerta


  return (
        <>
            <div>
                <h1 className='text-indigo-600 text-5xl font-extrabold'>Reestablece tu Password y no pierdas Acceso a  <span className="text-black"> tus Pacientes</span></h1>
              </div>
            <div className='mt-20 md:mt-5 rounded-xl bg-white shadow-lg py-10 px-5'>
              {
                msg && <Alerta alerta={alerta}/>
              }
              {
                tokenValido && 
                <>
                    <form onSubmit={handleOnSubmit}  action="">
                        <div className='my-5'>
                            <label className='block uppercase text-gray-600 font-bold'>Tu nuevo Password</label>
                            <input className='border rounded-xl w-full p-3 mt-3' type="password" name=""  value={password} onChange={e=>setPassword(e.target.value)} id="password" placeholder='Tu nuevo Password' />
                        </div>
                        <input className=' bg-indigo-700 w-full md:w-auto rounded-lg uppercase text-white hover:cursor-pointer hover:bg-indigo-900 py-3 px-10 transition-colors duration-300 mt-5 font-bold' type="submit" value="Guardar nuevo Password" />
                    </form>
                    <nav className='mt-10 lg:flex lg:justify-between'>
                      <Link className='text-center text-gray-500 my-5' to="/">Inicia Sesión.</Link>
                    </nav>
                </>
              }
              </div>
                
        </>
      )
}

export default ResetearPassword