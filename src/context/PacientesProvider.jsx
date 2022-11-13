import { createContext, useState, useEffect } from "react";
import clienteAxios from "../../config/axiosConfig";

const PacientesContext = createContext()

export const PacientesProvider = ({children})=>{

    const [ pacientes, setPacientes ] = useState([])
    const [ paciente, setPaciente ] = useState({})

    useEffect(()=>{
        const obtenerPacientes = async()=>{
            try {
                const token = localStorage.getItem("token")
                if(!token) return
                const config = {headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}` 
                    }
                }
                const {data} = await clienteAxios.get("/pacientes", config)
                setPacientes(data)
                
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        obtenerPacientes()
    },[])

    const guardarPaciente = async(paciente)=>{

        const token = localStorage.getItem("token")
                const config = {headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}` 
                    }
                }

        if(paciente.id){
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacienteEditado = pacientes.map(pacienteState=> pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacienteEditado)
                
            } catch (error) {
                console.log(error)
            }
        }else{

            try {
                
                const {data} = await clienteAxios.post("/pacientes", paciente, config)
                const { __v, createdAt, updatedAt, ...pacienteAlmacenado} = data
                setPacientes([pacienteAlmacenado, ...pacientes])
              
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        return
        
        
    }

    const editarPaciente = (paciente)=>{
        setPaciente(paciente)
    }

    const eliminarPaciente = async(id)=>{
        const confirmar = confirm("¿Desea ELIMINAR a este paciente?")
        if(confirmar){
            try {
                const token = localStorage.getItem("token")
                const config = {headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}` 
                    }
                }
                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacienteEliminado = pacientes.filter(pacienteState=> pacienteState._id !== id )
                setPacientes(pacienteEliminado)
                
            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
        <PacientesContext.Provider
        value={{
            pacientes,
            guardarPaciente,
            editarPaciente,
            paciente,
            eliminarPaciente

        }}>
            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext