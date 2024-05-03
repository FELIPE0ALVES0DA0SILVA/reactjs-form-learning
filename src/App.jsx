import { useState } from 'react'
import './styles/App.css'

import Apontamento from './Components/Apontamento/Apontamento.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Apontamento></Apontamento>
    </>
  )
}

export default App
