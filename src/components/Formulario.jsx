import React, { useEffect } from 'react'
import { useState } from 'react'
import Alerta from "./Alerta"
import usePacientes from '../hooks/usePacientes'

const Formulario = () => {

    const [ nombre, setNombre ] = useState("")
    const [ propietario, setPropietario ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ fecha, setFecha ] = useState("")
    const [ sintomas, setSintomas ] = useState("") 
    const [ id, setId ] = useState(null)

    const [ alerta, setAlerta] = useState({})

    const {guardarPaciente, paciente} = usePacientes()

    useEffect(()=>{
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)

        }
    }, [paciente])

    const handleSubmit = e=>{
        e.preventDefault()

        if([nombre, propietario, email, fecha, sintomas].includes("")){
            setAlerta({msg: "Todos los campos son necesarios", error: true})
            return
        }
        setAlerta({msg: "Paciente Guardado Correctamente"})
        guardarPaciente({nombre, propietario, email, fecha, sintomas, id})
        setNombre("")
        setEmail("")
        setFecha("")
        setSintomas("")
        setPropietario("")
        setId("")

    }

    const { msg } = alerta

    return (
    <>
        <div className=''>
            <p className='font-bold text-lg text-center'>Añade tus Pacientes y <span className='text-indigo-600'>Adminístralos</span></p>
        </div>
        <form onSubmit={handleSubmit} className='bg-white rounded-lg py-10 mb-10 lg:mb-0 shadow-md px-5'>
            {
                msg && <Alerta alerta={alerta}/>
            }
            <div className='mb-5'>
                <label className='text-gray-700 uppercase font-bold' htmlFor="nombre">Nombre Mascota</label>
                <input value={nombre} onChange={e=>setNombre(e.target.value)} className='w-full border p-2 mt-2 rounded-md placeholder-gray-400' type="text" name="nombre" id="mascota" placeholder='Nombre de la Mascota' />
            </div>
            <div className='mb-5'>
                <label className='text-gray-700 uppercase font-bold' htmlFor="propietario">Nombre Propietario</label>
                <input value={propietario} onChange={e=>setPropietario(e.target.value)} className='w-full border p-2 mt-2 rounded-md placeholder-gray-400' type="text" name="propietario" id="propietario" placeholder='Nombre del Propietario' />
            </div>
            <div className='mb-5'>
                <label className='text-gray-700 uppercase font-bold' htmlFor="email">Email Propietario</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} className='w-full border p-2 mt-2 rounded-md placeholder-gray-400' type="text" name="email" id="email" placeholder='Email del Propietario' />
            </div>
            <div className='mb-5'>
                <label className='text-gray-700 uppercase font-bold' htmlFor="alta">Fecha Alta</label>
                <input value={fecha} onChange={e=>setFecha(e.target.value)} className='w-full border p-2 mt-2 rounded-md placeholder-gray-400' type="date" name="alta" id="alta" placeholder='Fecha de Alta' />
            </div>
            <div className='mb-5'>
                <label className='text-gray-700 uppercase font-bold' htmlFor="sintomas">Síntomas</label>
                <textarea value={sintomas} onChange={e=>setSintomas(e.target.value)} className='w-full border p-2 mt-2 rounded-md placeholder-gray-400' name="sintomas" id="sintomas" placeholder='Síntomas de la Mascota' />
            </div>
            <input className='w-full bg-indigo-600 py-3 uppercase text-white font-bold rounded-md hover:cursor-pointer hover:bg-indigo-800 transition-colors duration-300 ' type="submit" value={id ? "Guardar Cambios" : "Agregar Paciente"} />
        </form>
    
    </>
  )
}

export default Formulario