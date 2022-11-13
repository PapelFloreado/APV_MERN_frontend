import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-br text-center text-white p-3 uppercase font-bold text-sm rounded-xl`}>{alerta.msg}</div>
  )
}

export default Alerta