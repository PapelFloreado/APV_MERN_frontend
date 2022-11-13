import React from 'react'
import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente'

const ListadoPacientes = () => {

    const {pacientes} = usePacientes()
    
    return (
      <>
        {
          pacientes.length ? 
              (<>
                  <h1 className='text-center text-3xl font-bold'>Lista de Pacientes</h1>
                  <p className='text-center pt-3 font-bold'>Administra tus <span className='font text-indigo-600'>Pacientes y citas</span></p>
                  {pacientes.map(paciente =>(<Paciente key={paciente._id} paciente={paciente}/>))}
              </>) : 
              (<>
                  <h1 className='text-center text-3xl font-bold'>No hay pacientes</h1>
                  <p className='text-center pt-3 font-bold'>Comienza agregando pacientes y <span className='font text-indigo-600'>aparecerán aquí</span></p>
              </>
              )
      
        }
      </>
    )
}

export default ListadoPacientes