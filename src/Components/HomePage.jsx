import '../styles/styles.css'

import { Link } from 'react-router-dom';


function HomePage() {


  return (
    <>
      <h2>Fortrak Containers</h2>
      <h1>Apontamento de Produção</h1>
      
      <div className='botao'>
        <Link to="/inicio" className="botao-entradas">
          Início
        </Link>
        <Link to="/termino" className="botao-saidas">
          Término
        </Link>
        <Link to="/tabela" className="botao-tabela">
          Tabela
        </Link>
      </div>
      
    </>
  )
}

export default HomePage