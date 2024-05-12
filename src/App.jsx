import './styles/App.css'

import {createBrowserRouter , RouterProvider} from 'react-router-dom'

import Apontamento from './Components/Apontamento/Apontamento.jsx'
import Tabela from './Components/Apontamento/Tabela.jsx'
import Termino from './Components/Apontamento/Termino.jsx'
import HomePage from './Components/HomePage.jsx'
import NotFoundPage from './Components/NotFoundPage.jsx'


function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element: <HomePage/>,
      errorElement: <NotFoundPage/>
    },
    {
      path: '/inicio',
      element: <Apontamento />,
    },
    {
      path: '/termino',
      element: <Termino />,
    },
    {
      path: '/tabela',
      element: <Tabela />,
    }

  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
