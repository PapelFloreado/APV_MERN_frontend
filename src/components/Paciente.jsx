import React from 'react'
import usePacientes from '../hooks/usePacientes'


const Paciente = ({paciente}) => {

    const {nombre, fecha, email, propietario, sintomas, _id} = paciente
    const {editarPaciente, eliminarPaciente} = usePacientes()

    const formatearFecha = (fecha)=>{
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat("es-MX", {dateStyle: "long"}).format(nuevaFecha)
    }
    return (
        <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
            <p className='font-bold uppercase text-indigo-700'>Nombre: {""}
                <span className='font-normal normal-case text-black'>{nombre}</span>
            </p>
            <p className='font-bold uppercase text-indigo-700'>Propietario: {""}
                <span className='font-normal normal-case text-black'>{propietario}</span>
            </p>
            <p className='font-bold uppercase text-indigo-700'>Email: {""}
                <span className='font-normal normal-case text-black'>{email}</span>
            </p>
            <p className='font-bold uppercase text-indigo-700'>Fecha: {""}
                <span className='font-normal normal-case text-black'>{formatearFecha(fecha)}</span>
            </p>
            <p className='font-bold uppercase text-indigo-700'>Síntomas: {""}
                <span className='font-normal normal-case text-black'>{sintomas}</span>
            </p>
            <div className='flex justify-between'>
                <button onClick={()=>editarPaciente(paciente)} type='button' className='mt-5 py-2 px-10 bg-indigo-600 hover:bg-indigo-700 transition-colors ease-in-out duration-300 text-white uppercase rounded-md'>
                    Editar
                </button>
                <button onClick={()=>eliminarPaciente(_id)} type='button' className='mt-5 py-2 px-10 bg-red-600 hover:bg-red-700 transition-colors ease-in-out duration-300 text-white uppercase rounded-md'>
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Paciente