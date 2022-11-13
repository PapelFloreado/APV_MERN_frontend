import React from 'react'
import { useState, useEffect } from 'react'
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useProvider'
import Alerta from '../components/Alerta'

const EditarPerfil = () => {

    const { auth, actualizarPerfil } = useAuth()
    const [ perfil, setPerfil ] = useState({})
    const [ alerta, setAlerta ] = useState({})

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    

    const handleSubmit = async e=>{
        e.preventDefault()
        const {nombre, email} = perfil

        if([nombre, email].includes("")){
            return setAlerta({msg: "El nombre y el email son necesarios", error: true})
        }
        
        const resultado = await actualizarPerfil(perfil)

        setAlerta(resultado)


    }

    const {msg} = alerta
    

    return (
        <>
            <AdminNav/>
            <h1 className='text-center text-3xl font-bold mt-10'>Editar Perfil</h1>
            <p className='text-center text-xl font-bold mt-3 mb-10'>Modifica tu {""}<span className='text-indigo-600'>Información de Perfil</span></p>
            <div className='flex justify-center'>
                <div className='w-full md:w-1/2 shadow-md bg-white p-5 rounded-lg'>
                    <form onSubmit={handleSubmit}>
                        {msg && <Alerta alerta={alerta}/>}
                        <div className='my-5'>
                            <label className='uppercase font-bold text-gray-500' htmlFor="nombre">Nombre</label>
                            <input className='border bg-gray-50 rounded-lg w-full mt-5 p-2' type="text" name="nombre" id="nombre" value={perfil.nombre || ""} 
                            onChange={e=>setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })} />
                        </div>
                        <div className='my-5'>
                            <label className='uppercase font-bold text-gray-500' htmlFor="sitioWeb">Sitio Web</label>
                            <input className='border bg-gray-50 rounded-lg w-full mt-5 p-2' type="text" name="web" id="sitioWeb" value={perfil.web || ""} 
                            onChange={e=>setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })} />
                        </div>
                        <div className='my-5'>
                            <label className='uppercase font-bold text-gray-500' htmlFor="telefono">Teléfono</label>
                            <input className='border bg-gray-50 rounded-lg w-full mt-5 p-2' type="text" name="telefono" id="telefono" value={perfil.telefono || ""} 
                            onChange={e=>setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })} />
                        </div>
                        <div className='my-5'>
                            <label className='uppercase font-bold text-gray-500' htmlFor="email">Email</label>
                            <input className='border bg-gray-50 rounded-lg w-full mt-5 p-2' type="text" name="email" id="email" value={perfil.email || ""} 
                            onChange={e=>setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })} />
                        </div>
                        <input className='w-full bg-indigo-600 py-3 rounded-lg text-white uppercase hover:bg-indigo-800 ease-in-out duration-500' type="submit" value="Guardar Cambios" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil